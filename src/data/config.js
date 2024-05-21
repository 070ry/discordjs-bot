const { GatewayIntentBits, AllowedMentionsTypes } = require('discord.js');
require('dotenv').config();

/**
 * ボットの設定を格納するオブジェクトです。
 * @constant {Object}
 */
const config = {
  /**
   * Discordクライアントの設定項目です。
   * @property {Object} client
   */
  client: {
    /**
     * Discordクライアントのインテントです。
     * @property {Array} intents - Discordクライアントのインテントです。
     */
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    /**
     * Discordクライアントのメンションの許可設定です。
     * @property {Array} allowedMentions - Discordクライアントのメンションの許可設定です。
     */
    allowedMentions: [AllowedMentionsTypes.Users, AllowedMentionsTypes.User],
  },
};

/**
 * 設定オブジェクトをエクスポートします。
 * @exports config
 */
module.exports = config;
