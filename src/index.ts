import * as dotenv from "dotenv";
import * as Discord from "discord.js";
import { GatewayIntentBits } from "discord.js";
dotenv.config();

const client = new Discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.on("ready", () => {
  console.log(`Connected as ${client.user!.tag}!`);
});

client
  .login(process.env.TOKEN)
  .then(() => {
    console.log("Successfully Connected!");
  })
  .catch((err) => {
    console.error("Error connecting: ", err);
  });

