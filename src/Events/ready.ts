import { Event } from "../Typings";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(`[CLIENT]: Total servers: ${client.guilds.cache.size}`);
    console.log(`[CLIENT]: ${client.user?.tag} ONLINE!`);
    client.user?.setActivity("Music BOT");
  },
};
