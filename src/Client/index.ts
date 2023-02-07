import { CommandRegistrationOptions } from "../Typings/Client";
import {
  ApplicationCommandDataResolvable,
  Client,
  Collection,
  GatewayIntentBits,
} from "discord.js";
import { Command } from "../Typings/Command";
import { readdirSync } from "fs";
import path from "path";
import * as dotenv from "dotenv";
import Title from "../Utils/String/Title";
dotenv.config();

class Bot extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  async registerCommands({ commands, guildId }: CommandRegistrationOptions) {
    guildId
      ? await this.guilds.cache.get(guildId)?.commands.set(commands)
      : await this.application?.commands.set(commands);
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPath = path.join(__dirname, "..", "Commands");
    const commandFiles = readdirSync(commandPath).flatMap((dir) => {
      return readdirSync(`${commandPath}/${dir}`)
        .filter((file) => file.endsWith(".ts"))
        .map((file) => `${commandPath}/${dir}/${file}`);
    });

    const promises = commandFiles.map(async (filePath) => {
      const command = await import(path.resolve(filePath)).then(
        (data) => data.slash
      );
      if (!command?.name) return;
      this.commands.set(command.name, command);
      slashCommands.push(command);
      console.log(`[COMMAND]: ${Title(command.name)} Loaded!`);
    });

    await Promise.all(promises);

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: `${process.env.GUILD_ID}`,
      });
    });
  }

  public async start() {
    this.login(process.env.TOKEN)
      .then(() => {
        console.log("[CLIENT]: Successfully Connected!");
      })
      .catch((err) => {
        console.error("[CLIENT]: Error connecting: ", err);
      });

    this.registerModules();
    const eventDirectory = path.join(__dirname, "..", "Events");
    const eventFiles = readdirSync(eventDirectory);

    for (const file of eventFiles) {
      if (!file.endsWith(".ts")) {
        continue;
      }

      const { event } = await import(`${eventDirectory}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));

      process.env.GUILD_ID
        ? console.log("[CLIENT]: Configured Test Server")
        : console.log("[CLIENT]: Test server not configured");
    }
  }
}

export default Bot;
