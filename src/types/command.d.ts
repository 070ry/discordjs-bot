import { Interaction, Client } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

/**
 * Class representing a command.
 */
export class Command extends SlashCommandBuilder {
  /**
   * Command data.
   */
  data: {
    name: string;
    description: string;
    options?: any;
    defaultPermission?: boolean;
    aliases?: string[];
  };

  /**
   * Executes the command.
   * @param interaction - The interaction object.
   * @param client - The Discord client object.
   * @returns Promise<void>
   */
  execute(interaction: Interaction, client: Client<boolean>): Promise<void>;
}
