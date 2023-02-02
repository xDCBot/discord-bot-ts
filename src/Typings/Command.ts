import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  GuildMember,
  ApplicationCommandData,
  CommandInteractionOptionResolver,
} from "discord.js";
import Client from "../Client";

type ExtendedInteraction = CommandInteraction & {
  member: GuildMember;
};

type RunOptions = {
  client: Client;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
};

type Run = (options: RunOptions) => void;

type Command = ApplicationCommandData & {
  name: string;
  description: string;
  run: Run;
} & ChatInputApplicationCommandData;

export { Command, ExtendedInteraction };
