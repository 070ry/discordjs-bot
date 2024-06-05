const logger = require('../utils/logger');
const commandRemover = require('../client/commandRemove');
const { Collection } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const env = require('../data/env');

const dir = path.join(env.root, 'messages', 'commands');
const commandDir = path.join(env.root, 'interactions', 'commands');

module.exports = async (message, client) => {
  const content = message.content;
  if (!content.startsWith(env.prefix)) return;

  const [command, ...args] = content.slice(env.prefix.length).split(' ');

  if (command === 'remove') {
    await commandRemover(client);
    return;
  }

  if (command === 'sync') {
    const reply = await message.reply('コマンドを更新します。');
    try {
      await reply.edit('古いコマンドを削除しています...');
      await commandRemover(client);
      await reply.edit('新しいコマンドを登録しています...');
      const commands = await loadCommands(commandDir);
      await reply.edit('コマンドをすべてのサーバーに登録しています...');
      await client.guilds.cache.forEach(guild => guild.commands.set(commands.map(cmd => cmd.data)));
      await reply.edit('コマンドを更新しました。');
    } catch (error) {
      logger.error(error);
      await reply.edit('更新に失敗しました。');
    }
  }

  await executeCommand(client, message, command, args);
};

async function executeCommand(client, message, commandName, args) {
  const commandPath = path.join(dir, `${commandName}.js`);
  if (!fs.existsSync(commandPath)) return;

  const command = require(commandPath);
  if (!command.execute) {
    logger.warn(`コマンドの実行に失敗しました: execute関数がありません。 (${commandName})`);
    return;
  }

  command.execute(client, message, args, command);
}

async function loadCommands(dir) {
  const files = await fs.readdir(dir);
  const commands = new Collection();

  for (const file of files.filter(file => file.endsWith('.js'))) {
    const command = require(path.join(dir, file));
    commands.set(command.data.name, command);
    if (command.data.aliases) {
      for (const alias of command.data.aliases) {
        const aliasCommand = { data: { ...command.data }, execute: command.execute };
        aliasCommand.data.name = alias;
        delete aliasCommand.data.aliases;
        commands.set(aliasCommand.data.name, aliasCommand);
      }
    }
  }

  return commands;
}
