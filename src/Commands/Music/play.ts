import { Player } from "discord-player";
import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { Command } from "../../Typings";

export const slash: Command = {
  name: "play",
  description: "Play a song",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to play",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ client, interaction }) => {
    const player = new Player(client);
    const embed = new EmbedBuilder();
    const query = interaction.options.get("song")?.value as string;
    const searchResult = await player.search(query, {
      requestedBy: interaction.member,
    });
    const track = searchResult.tracks[0];
    const queue = await player.createQueue(interaction.guild!, {
      leaveOnEnd: true,
      leaveOnStop: true,
      initialVolume: 60,
      spotifyBridge: true,
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    });

    if (!searchResult) {
      await queue.destroy();
      return interaction.editReply({
        content: `Track **${query}** not found!`,
      });
    }

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel!);
    } catch {
      await player.deleteQueue(interaction.guildId!);
      return interaction.editReply({
        content: `You need join a channel`,
      });
    }

    if (!queue.connection) {
      await queue.connect(interaction.member.voice.channel!);
      await queue.play(track);
    } else {
      queue.addTrack(track);
    }

    player.on("trackEnd", async () => {
      if (!queue.connection) await queue.play(track);
    });

    await embed
      .setDescription(
        `Search: ${query}\n` +
          `Requested by: ${interaction.member}\n` +
          `Playing: ${track.title}`
      )
      .setColor("DarkVividPink")
      .setImage(track.thumbnail)
      .setTitle(track.title)
      .setURL(track.url);

    await interaction.followUp({ embeds: [embed] });

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(track);

    if (!queue.playing) await queue.play();
  },
};
