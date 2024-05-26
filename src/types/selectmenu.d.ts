import { Interaction, Client, StringSelectMenuInteraction } from 'discord.js';

/**
 * Class representing a command.
 */
export class SelectMenu extends StringSelectMenuInteraction {
  /**
   * The data of the command.
   */
  data: {
    customId: string;
  };

  /**
   * Executes the command.
   * @param interaction - The interaction object.
   * @param client - The Discord client object.
   * @returns Promise<void>
   */
  execute(interaction: Interaction, client: Client<boolean>): Promise<void>;
}
