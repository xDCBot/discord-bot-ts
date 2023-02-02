import { Command } from "../../Typings";

export const slash: Command = {
  name: "ping",
  description: "Calculates the ping of the bot.",
  run: ({ interaction }) => {
    return interaction.followUp({
      content: `:rocket:  Ping: \`${interaction.client.ws.ping} ms\`.`,
    });
  },
};
