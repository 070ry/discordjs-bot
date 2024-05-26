/**
 * This module defines the "exit" command for the console.
 * It destroys the current client instance and exits the process.
 * @module utils/console/commands/exit
 */

const logger = require('../../logger');

/**
 * Executes the "exit" command.
 * @param {import('discord.js').Client} client - The current client instance.
 * @returns {Promise<void>} - A promise that resolves when the command is executed.
 */
module.exports = {
  /**
   * Executes the "exit" command.
   * It destroys the current client instance and exits the process.
   * @param {import('discord.js').Client} client - The current client instance.
   * @returns {Promise<void>} - A promise that resolves when the command is executed.
   */
  execute: async client => {
    await logger.log('[ console ] Stopping the client...');
    client.destroy();
    process.exit(0);
  },
};
