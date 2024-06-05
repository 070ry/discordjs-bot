const logger = require('../../logger');

/**
 * @type {import('../../../types/consoleCommands').ConsoleCommands}
 */
module.exports = {
  name: 'tag',
  execute: async client => {
    await logger.log('[ console ] Tag: ' + client.user.tag);
  }
};
