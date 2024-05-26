const process = require('process');
const logger = require('./utils/logger');
const config = require('./data/config');
const { Events, Handlers } = require('./handlers');

(async () => {
  const client = await require('./client/init').init();
  require('./utils/console/process').console(client);

  for (const event of Object.keys(Handlers)) {
    await client.on(Events[event], e => Handlers[event](e, client, config));
  }
  process.on('SIGINT', () => {
    logger.log('[ Client ] 終了します。');
    client.destroy();
    process.exit(0);
  });
})();
