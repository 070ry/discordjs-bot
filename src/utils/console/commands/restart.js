/**
 * This module defines the "restart" command for the console.
 * It destroys the current client instance and creates a new one.
 * It registers all the event handlers for the new client instance.
 * @module utils/console/commands/restart
 */

const { Events, Handlers } = require('../../../handlers');
const logger = require('../../logger');

/**
 * Executes the "restart" command.
 * @param {import('discord.js').Client} client - The current client instance.
 * @returns {Promise<void>} - A promise that resolves when the command is executed.
 */
module.exports = {
  /**
   * Executes the "restart" command.
   * @param {import('discord.js').Client} client - The current client instance.
   * @returns {Promise<void>} - A promise that resolves when the command is executed.
   */
  async execute(client) {
    const stop = client.destroy();
    logger.log('[ console ] クライアントを再起動します。');
    const newClient = await require('../../../client/init').init();
    for (const event of Object.keys(Handlers)) {
      await newClient.on(Events[event], e => Handlers[event](e, newClient));
    }
    await stop;
  }
};
