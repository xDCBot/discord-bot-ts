import { Command } from "../../Typings";

export const slash: Command = {
  name: "ping",
  description: ":comet:Show the ms!.",
  run: ({ interaction }) => {
    return interaction.followUp({
      content: `:rocket:  Ping: \`${interaction.client.ws.ping} ms\`.`,
    });
  },
};
