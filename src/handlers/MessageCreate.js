const logger = require('../utils/logger');
const commandRemover = require('../client/commandRemove');
const { Collection } = require('discord.js');
const fs = require('fs');
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

async function executeCommand(client, message, name, args) {
  const cmdDir = path.join(dir, `${name}.js`);
  if (!fs.existsSync(cmdDir)) {
    return logger.warn(`Message Command not found: ${name}`);
  }
  const cmd = require(cmdDir);
  if (typeof cmd.execute !== 'function' || typeof cmd.data !== 'object') {
    let missings = [];
    if (typeof cmd.execute !== 'function') missings.push('execute');
    if (typeof cmd.data !== 'object') missings.push('data');
    logger.warn(
      `Failed to execute message command. Missing: ${missings.join(', ')} (${name})`
    );
    return;
  }

  cmd.execute(client, message, args);
}

async function loadCommands(dir) {
  const files = await fs.readdir(dir);
  const commands = new Collection();

  for (const file of files.filter(file => file.endsWith('.js'))) {
    const cmd = require(path.join(dir, file));
    commands.set(cmd.data.name, cmd);
    if (cmd.data.aliases) {
      for (const a of cmd.data.aliases) {
        const alias = { data: { ...cmd.data }, execute: cmd.execute };
        alias.data.name = a;
        delete alias.data.aliases;
        commands.set(alias.data.name, alias);
      }
    }
  }

  return commands;
}
