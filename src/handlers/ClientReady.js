const { ActivityType } = require('discord.js');
const logger = require('../utils/logger');

const env = require('../data/env');

/**
 * Discordクライアントの準備完了イベントのハンドラ
 * @type {void} e - イベント
 * @type {import("discord.js").Client} client - Discordクライアントのインスタンス
 */
module.exports = (e, client) => {
  presense(client);
  return logger.log(
    `[ Client ] Ready as ${client.user.tag} - ${env.version}\n` + `Type 'help' to see console command help.`
  );
};
/**
 * @param {import("discord.js").Client} client - Discordクライアントのインスタンス
 */
function presense(client) {
  return client.user.setPresence({
    activities: [
      {
        name: 'Discord.js',
        type: ActivityType.Competing
      }
    ]
  });
}
