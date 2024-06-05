const { Events, Handlers } = require('../../../handlers');
const logger = require('../../logger');

/**
 * @type {import('../../../types/consoleCommands').ConsoleCommands}
 */
module.exports = {
  name: 'restart',
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
