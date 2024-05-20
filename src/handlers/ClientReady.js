module.exports = (e, client, config) => {
  const { log } = require("../utils/logger");
  log(
    `[ Events/ClientReady ] Logged in as ${client.user.tag}! Version: ${config.general.version}`,
  );
};
