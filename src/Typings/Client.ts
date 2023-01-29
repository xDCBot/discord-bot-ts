import { ApplicationCommandDataResolvable } from "discord.js";

export type CommandRegistrationOptions = {
  guildId?: string;
  commands: ApplicationCommandDataResolvable[];
};
