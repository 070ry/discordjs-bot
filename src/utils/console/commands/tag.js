/**
 * This module defines the "tag" command for the console.
 * It displays the user tag of the Discord client.
 * @module utils/console/commands/tag
 */

const logger = require('../../logger');

/**
 * Executes the "tag" command.
 * @param {import('discord.js').Client} client - The current client instance.
 * @returns {Promise<void>} - A promise that resolves when the command is executed.
 */
module.exports = {
  /**
   * Executes the "tag" command.
   * It displays the user tag of the Discord client.
   * @param {import('discord.js').Client} client - The current client instance.
   * @returns {Promise<void>} - A promise that resolves when the command is executed.
   */
  execute: async client => {
    await logger.log('[ console ] Tag: ' + client.user.tag);
  }
};
