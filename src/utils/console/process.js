const fs = require('fs');
const { join } = require('path');

const env = require('../../data/env');
const logger = require('../logger');

module.exports = {
  console: async client => {
    await process.stdin.on('data', input => {
      const args = input.toString().trim().split(' ');
      const message = args.shift();

      if (!message) return;

      runCommand(message, args, client);
    });
    logger.log('[ process ] リスナーを起動しました。');
  },
};

/**
 * @param {string} command - メッセージ
 * @param {string[]} args - 引数
 * @param {import('discord.js').Client} client - Discordクライアント
 */
function runCommand(command, args, client) {
  const files = fs.readdirSync(join(env.root, 'utils', 'console', 'commands')).filter(file => file.endsWith('.js'));

  const matchedCommand = files.find(file => {
    const name = file.replace(/\.js$/, '');
    const cmd = require(join(env.root, 'utils', 'console', 'commands', file));
    return name === command;
  });

  if (matchedCommand) {
    const command = require(join(env.root, 'utils', 'console', 'commands', matchedCommand));
    if (!command.execute) {
      return logger.warn('コンソール コマンドの実行に失敗しました: execute関数がありません。 (' + command + ')');
    }
    command.execute(client, args, command);
  } else {
    logger.warn('コンソール コマンドが見つかりませんでした: ' + command);
  }
}
