const { GatewayIntentBits } = require('discord.js')
require('dotenv').config()

/**
 * ボットの設定を格納するオブジェクトです。
 * @constant {Object}
 */
const config = {
  /**
   * 全般の設定項目です。
   * @property {Object} general
   */
  general: {
    /**
     * ボットのバージョンです。
     * @property {string} version - ボットのバージョンです。
     */
    version: '1.0.1',
    /**
     * ボットコマンドをトリガーするための接頭辞です。
     * @property {string} prefix - ボットコマンドをトリガーするための接頭辞です。
     */
    prefix: '!',
    /**
     * Discordボットのトークンです。
     * @property {string} token - Discordボットのトークンです。
     */
    token: process.env.token,
  },
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
    allowedMentions: ['roles', 'users'],
  },
}

/**
 * 設定オブジェクトをエクスポートします。
 * @exports config
 */
module.exports = config
