import { Interaction, Client, ButtonInteraction } from 'discord.js';

/**
 * Class representing a command.
 */
export class Button {
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
  execute(interaction: ButtonInteraction, client: Client<boolean>): Promise<void>;
}

