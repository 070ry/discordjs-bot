const logger = require('../utils/logger');
const remover = require('../client/commandRemove');

const config = require('../data/config');

const fs = require('fs');
const path = require('path');
const { Collection, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

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
  const args = content.split(' ').slice(1);
  if (command === 'remove') {
    remover(client);
  }
  if (command === 'sync') {
    const reply = await e.reply('コマンドを更新します。');
    try {
      reply.edit('古いコマンドを削除しています...');
      await remover(client);
      reply.edit('新しいコマンドを登録しています...');
      const commands = new Collection();
      const dir = path.join(env.root, 'interactions', 'commands');
      const files = await fs.readdirSync(dir);

      for (const file of files.filter(file => file.endsWith('.js'))) {
        const command = require(path.join(dir, file));
        commands.set(command.data.name, command);
        if (command.data.aliases) {
          for (const alias of command.data.aliases) {
            const aliasObj = { data: { ...command.data }, execute: command.execute };
            aliasObj.data.name = alias;
            delete aliasObj.data.aliases;
            commands.set(aliasObj.data.name, aliasObj);
          }
        }
      }
      reply.edit('コマンドをすべてのサーバーに登録しています...');
      await client.guilds.cache.forEach(guild => {
        guild.commands.set(commands.map(cmd => cmd.data));
      });
      await reply.edit('コマンドを更新しました。');
    } catch (error) {
      logger.error(error);
      await reply.edit('更新に失敗しました。');
    }
  }
  if (command === 'test') {
    e.reply({
      content: 'test',
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId('help').setLabel('help').setStyle(ButtonStyle.Success),
        ),
      ],
    });
  }
};
