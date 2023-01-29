import { CommandRegistrationOptions } from "./../Typings/Client";
import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }

  async registerCommands({ commands, guildId }: CommandRegistrationOptions) {}

  async registerModules() {}

  async start() {
    this.on("ready", () => {
      console.log(`Connected as ${this.user?.tag}!`);
    });
    this.login(process.env.TOKEN)
      .then(() => {
        console.log("Successfully Connected!");
      })
      .catch((err) => {
        console.error("Error connecting: ", err);
      });
  }
}

export default Bot;
