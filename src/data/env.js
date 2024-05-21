const { version: packageVersion } = require('../../package.json');
require('dotenv').config();

/**
 * 環境変数の設定
 * @property {string} token - DiscordのBotのトークン
 * @property {string} prefix - コマンドのプレフィックス
 * @property {string} version - バージョン
 * @property {string} root - プロジェクトのルートパス
 */
const env = {
  token: process.env.token,
  prefix: process.env.prefix || '!',
  version: process.env.version || packageVersion || 'unknown',
  root: process.env.root || __dirname + '/..',
};

module.exports = env;
