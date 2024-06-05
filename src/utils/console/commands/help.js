const logger = require('../../logger');

/**
 * @type {import('../../../types/consoleCommands').ConsoleCommands}
 */
module.exports = {
  name: 'help',
  execute: async() => {
    await logger.log('[ console ] ping, help, restart, tag');
  },
};

