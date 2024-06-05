import { Interaction, Client, ButtonInteraction } from 'discord.js';

/**
 * Class representing a button.
 */
export class Button {
  /**
   * The data of the button.
   */
  data: {
    customId: string;
  };

  /**
   * Executes the button interaction.
   * @param interaction - The interaction object.
   * @param client - The Discord client object.
   * @returns Promise<void>
   */
  execute(interaction: ButtonInteraction, client: Client<boolean>): Promise<void>;
}
