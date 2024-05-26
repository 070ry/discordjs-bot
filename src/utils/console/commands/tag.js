const logger = require('../../logger');

module.exports = {
  execute: async client => {
    await logger.log('[ console ] Tag: ' + client.user.tag);
  },
};
