const { stdout } = require("process");
const { info, warn, error } = console;

/**
 * ログメッセージの色の設定
 */
const colors = {
  info: "\x1b[34m", // 青
  warn: "\x1b[33m", // 黄色
  error: "\x1b[31m", // 赤
  log: "\x1b[0m", // リセット
  reset: "\x1b[0m", // リセット
};

/**
 * ログメッセージを指定されたレベルでフォーマットする
 * @param {string} level - ログレベル (info, warn, error)
 * @param {string} message - ログメッセージ
 * @returns {string} - フォーマット済みのログメッセージ
 */
function format(level, message) {
  return `${colors[level]}[ ${level} ] ${message}${colors.log}`;
}

/**
 * ログメッセージを出力するための関数をエクスポートするモジュール
 * @module Logger
 */
module.exports = {
  /**
   * 標準出力にログメッセージを出力する
   * @param {string} message - ログメッセージ
   */
  log: (message) => stdout.write(`${message}\n`),

  /**
   * 情報メッセージをログに出力する
   * @param {string} message - ログメッセージ
   */
  info: (message) => info(format("info", message)),

  /**
   * エラーメッセージをログに出力する
   * @param {string} message - ログメッセージ
   */
  error: (message) => error(format("error", message)),

  /**
   * 警告メッセージをログに出力する
   * @param {string} message - ログメッセージ
   */
  warn: (message) => warn(format("warn", message)),
};
