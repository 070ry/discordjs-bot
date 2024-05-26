const { Events, Handlers } = require('../../../handlers');
const logger = require('../../logger');

module.exports = {
  execute: client => {
    client.destroy();
    logger.log('[ console ] クライアントを再起動します。');
    setTimeout(async () => {
      const newClient = await require('../../../client/init').init();
      for (const event of Object.keys(Handlers)) {
        await newClient.on(Events[event], e => Handlers[event](e, newClient));
      }
    }, 5000);
  },
};
