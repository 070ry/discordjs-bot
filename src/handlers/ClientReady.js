const { ActivityType } = require('discord.js');

const env = require('../data/env');

module.exports = (e, client) => {
  const { log } = require('../utils/logger');
  // presense(client);
  return log(`[ Client ] Ready as ${client.user.tag} - ${env.version}`);
};
/**
 *
 * @param {import("discord.js").Client} client - Discordクライアントのインスタンス
 */
function presense(client) {
  return client.user.setPresence({
    activities: [
      {
        name: 'Discord.js',
        type: ActivityType.Competing,
      },
    ],
  });
}
