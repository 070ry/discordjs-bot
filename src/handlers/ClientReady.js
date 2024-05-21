const env = require('../data/env');

module.exports = (e, client) => {
  const { log } = require('../utils/logger');
  log(`[ Events/ClientReady ] Bot: ${client.user.tag} Version: ${env.version}`);
};
