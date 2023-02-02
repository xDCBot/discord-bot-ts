import { Interaction, CommandInteractionOptionResolver } from "discord.js";
import { Event } from "../Typings";
import { ExtendedInteraction } from "../Typings/Command";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      !command
        ? interaction.reply(":boom:  Invalid command")
        : await interaction.deferReply();
      command?.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtendedInteraction,
      });
    }
  },
};
