const { Client } = require('discord.js');
const logger = require('../utils/logger');

const config = require('../data/config');
const env = require('../data/env');

/**
 * Discordクライアントの新しいインスタンスを作成する
 * @returns {Promise<Client>} Discordクライアントのインスタンス
 * @throws {Error} 提供されたトークンが無効な場合
 */
module.exports.init = async () => {
  logger.log('[ Client ] 初期化中...');

  const intents = config.client.intents;

  const client = new Client({
    intents,
    failIfNotExists: false,
    ws: { properties: { browser: 'Discord iOS' } }
  });

  try {
    await client.login(env.token);
    return client;
  } catch (error) {
    throw new Error(error, { cause: 'トークンが無効です' });
  }
};
