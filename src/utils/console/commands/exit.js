const logger = require('../../logger');
const process = require('process');

/**
 * @type {import('../../../types/consoleCommands').ConsoleCommands}
 */
module.exports = {
  name: 'exit',
  execute: async client => {
    await logger.log('[ console ] Stopping the client...');
    client.destroy();
    process.exit(0);
  }
};
