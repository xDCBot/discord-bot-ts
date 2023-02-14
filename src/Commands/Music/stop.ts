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
      embed.setTitle('Stop audio');
      embed.setDescription('There is no audio currently playing!');
      embed.setColor('#ff0000');

      return interaction.editReply({
        embeds: [embed],
      });
    }

    queue.stop();

    embed.setTitle('Stop audio');
    embed.setDescription('Audio stopped!');
    embed.setColor('#00ff00');

    return interaction.editReply({
      embeds: [embed],
    });
  },
};