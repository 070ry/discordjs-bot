/**
 * This module defines the "ping" command for the console.
 * It displays the client's ping value.
 * @module utils/console/commands/ping
 */

const logger = require('../../logger'); // Import the logger module

/**
 * Object that represents the "ping" command.
 * @type {Object}
 * @property {string} name - The name of the command.
 * @property {function} execute - The function that executes the command.
 */
module.exports = {
  /**
   * The name of the command.
   * @type {string}
   */
  name: 'ping',

  /**
   * Executes the "ping" command.
   * It displays the client's ping value.
   * @param {import('discord.js').Client} client - The current client instance.
   * @returns {Promise<void>} - A promise that resolves when the command is executed.
   */
  execute: async client => {
    await logger.log('Client ping: ' + client.ws.ping + 'ms');
  }
};
