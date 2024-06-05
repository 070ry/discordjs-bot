const process = require('process');
require('dotenv').config();

const { version } = require('../../package.json');
const path = require('path');

/**
 * 環境変数の設定
 * @property {string} token - DiscordのBotのトークン
 */
const env = {
  token: process.env.token,
  /**
   * コマンドのプレフィックス
   * @property {string}
   */
  prefix: process.env.prefix || '!',
  /**
   * バージョン
   * @property {string}
   */
  version: process.env.version || version || 'unknown',
  /**
   * プロジェクトのルートパス
   * @property {string}
   */
  root: process.env.root || path.join(process.cwd(), 'src')
};

module.exports = env;
