import { Command } from "../../Typings";

export const slash: Command = {
  name: "help",
  description: "🗒️ Help menu.",
  run: ({ interaction }) => {
    return interaction.followUp({
      content: `This code comes from a GitHub project (https://github.com/xDCBot/discord-bot-ts).\nThe use of this one is possible while keeping the credits for free.\nIf you find a bug, please contact us!\nDaniel R.#9999 and miukimuik#0062`,
    });
  },
};
