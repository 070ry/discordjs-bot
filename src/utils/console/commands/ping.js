const logger = require('../../logger');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

/**
 * Executes the "ping" command.
 * @type {import('../../../types/consoleCommands').ConsoleCommands}
 * @returns {Promise<void>} - A promise that resolves when the command is executed.
 */
module.exports = {
  name: 'ping',

  execute: async client => {
    const rest = new REST({ version: '9' }).setToken(client.token);
    const start = Date.now();
    await rest.get(Routes.gatewayBot());
    const end = Date.now();
    await logger.log('Client ping: ' + client.ws.ping + 'ms');
    await logger.log('API ping: ' + (end - start) + 'ms');
  }
};

