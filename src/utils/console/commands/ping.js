const logger = require('../../logger');

module.exports = {
  name: 'ping',
  execute: async client => {
    await logger.log('Client ping: ' + client.ws.ping + 'ms');
  },
};
