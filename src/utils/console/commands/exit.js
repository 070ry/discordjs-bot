const logger = require('../../logger');

module.exports = {
  execute: async client => {
    await logger.log('[ console ] クライアントを終了します。');
    client.destroy();
    process.exit(0);
  },
};
