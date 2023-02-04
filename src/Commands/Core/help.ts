import { Command } from "../../Typings";

export const slash: Command = {
  name: "help",
  description: "🗒️ Show help information.",
  run: ({ interaction }) => {
    return interaction.followUp({
      content: `This code comes from a GitHub project (https://github.com/xDCBot/discord-bot-ts).\n
      The use of this one is possible while keeping the credits for free.\n
      If you find a bug, please contact us!\n
      miukimuik#0062 and Daniel R.#9999`,
    });
  },
};
