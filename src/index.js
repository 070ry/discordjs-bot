const config = require('./data/config');

const { Events, Handlers } = require('./handlers');

(async () => {
  const client = await require('./client/init').init();
  for (const event of Object.keys(Handlers)) {
    await client.on(Events[event], e => Handlers[event](e, client, config));
  }
})();
