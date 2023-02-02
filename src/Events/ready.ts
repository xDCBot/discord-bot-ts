import { Event } from "../Typings";

export const event: Event = {
  name: "ready",
  run: (server) => {
    console.log(`[SERVER]: ${server.user?.tag} ONLINE!`);
  },
};
