const fs = require('fs');
const path = require('path');
const env = require('../data/env');

/**
 * コマンドを格納するマップ
 * @type {Map<string, Object>}
 */
const commands = new Map();

const loadCommands = () => {
  const dir = path.join(env.root, 'commands');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(dir, file));
    commands.set(command.data.name, command);
    if (command.data.aliases) {
      for (const alias of command.data.aliases) {
        commands.set(alias, command);
      }
    }
  }
};

/**
 * コマンド名からコマンドオブジェクトを取得する
 * @param {string} name - コマンド名
 * @returns {Object|undefined} - コマンドオブジェクト(見つからない場合はundefined)
 */
const getCommand = name => commands.get(name);

/**
 * インタラクション作成イベントのハンドリング
 * @param {Object} e - インタラクション作成イベント
 * @param {Object} client - Discordクライアント
 */
module.exports = async (e, client) => {
  if (commands.size === 0) {
    loadCommands();
  }
  const command = getCommand(e.commandName);
  if (command) {
    command.execute(e, client);
  }
};
