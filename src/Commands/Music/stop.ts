import { Command } from '../../Typings';
import { EmbedBuilder } from 'discord.js';
import { Player } from 'discord-player';

export const slash: Command = {
  name: 'stop',
  description: 'Stop playing audio',
  run: async ({ client, interaction }) => {
    const player = new Player(client);
    const embed = new EmbedBuilder();
    const queue = player.getQueue(interaction.guildId!);

    if (!queue || !queue.playing) {
      return interaction.editReply({
        content: 'There is no audio currently playing!'
      });
    }

    queue.stop();

    return interaction.editReply({
      content: 'Audio stopped!'
    });
  },
};