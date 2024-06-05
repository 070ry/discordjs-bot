import { ApplicationCommandType, ApplicationCommandData, Interaction, Client } from 'discord.js';

/**
 * Class representing a command.
 */
export class Command {
  /**
   * Command data.
   */
  data: ApplicationCommandData & {
    defaultPermission?: boolean;
    aliases?: string[];
  };

  /**
   * Executes the command.
   * @param interaction - The interaction object.
   * @param client - The Discord client object.
   * @returns Promise<void>
   */
  execute(interaction: Interaction, client: Client<boolean>, args: string[]): Promise<void>;
}
