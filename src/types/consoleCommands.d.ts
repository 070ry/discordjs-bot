import { Client } from 'discord.js';

/**
 * Class representing a select menu.
 */
export class ConsoleCommands {
  /**
   * Name of the command.
   */
    name: string;

  /**
   * Executes the command.
   * @param client - The Discord client object.
   * @param args - The arguments of the command.
   * @returns Promise<void>
   */
  execute(
    client: Client<boolean>,
    args: string[]
  ): Promise<void>;
}
