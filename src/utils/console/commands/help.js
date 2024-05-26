/**
 * Module that defines the "help" command for the console.
 * It displays a list of available console commands.
 * @module utils/console/commands/help
 */

const logger = require('../../logger');

/**
 * Executes the "help" command.
 * It displays a list of available console commands.
 * @returns {Promise<void>} - A promise that resolves when the command is executed.
 */
module.exports = {
  /**
   * Executes the "help" command.
   * It displays a list of available console commands.
   * @returns {Promise<void>} - A promise that resolves when the command is executed.
   */
  execute: async () => {
    await logger.log('[ console ] ping, help, restart, tag');
  }
};
