const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

const env = require('../data/env');

/**
 * メッセージ受信イベントのハンドラ
 * @param {import("discord.js").Message} e - 受信したメッセージ
 * @param {import("discord.js").Client} client - Discordクライアント
 */
module.exports = async (e, client) => {
  const content = e.content;
  if (!content.startsWith(env.prefix)) return;
  const command = content.split(' ')[0].slice(env.prefix.length);

  if (command === 'sync') {
    const reply = await e.reply('コマンドを更新しています...');
    try {
      const commands = new Collection();
      const dir = path.join(env.root, 'commands');
      const files = await fs.readdir(dir);

      for (const file of files) {
        if (!file.endsWith('.js')) continue;
        const command = require(path.join(dir, file));
        commands.set(command.data.name, command);
        if (command.data.aliases) {
          for (const alias of command.data.aliases) {
            commands.set(alias, command);
          }
        }
      }

      await client.guilds.cache.forEach(guild => {
        guild.commands.set(commands.map(cmd => cmd.data));
      });
      await reply.edit('コマンドを更新しました。');
    } catch (error) {
      logger.error(error);
      await reply.edit('更新に失敗しました。');
    }
  }
};
