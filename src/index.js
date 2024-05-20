const config = require("./data/config");

const { Events, Handlers } = require("./handlers");
const { init } = require("./client/init");
const { log } = require("./utils/logger");

(async () => {
  const client = await init();

  for (const event of Object.keys(Handlers)) {
    log(`[ Events/${event} ] Loaded!`);
    client.on(Events[event], (e) => Handlers[event](e, client, config));
  }
})();
