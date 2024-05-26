const { InteractionType } = require('discord.js');

const fs = require('fs');
const path = require('path');
const env = require('../data/env');
const logger = require('../utils/logger');

/**
 * コマンドを格納するマップ
 * @type {Map<string, Object>}
 */
const commands = new Map();
const root = path.join(env.root, 'interactions');

const loadCommands = () => {
  const dir = path.join(root, 'commands');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(dir, file));
    if (!command.data || !command.data.name || !command.data.description || !command.execute) {
      throw new Error(`Invalid command: ${file}. Missing name, description, or execute function.`);
    }
    commands.set(command.data.name, command);
    if (command.data.aliases) {
      for (const alias of command.data.aliases) {
        commands.set(alias, command);
      }
    }
  }
};

/**
 * インタラクション作成イベントのハンドリング
 * @param {import("discord.js").Interaction} e - インタラクション作成イベント
 * @param {import("discord.js").Client} client - Discordクライアント
 */
module.exports = async (e, client) => {
  switch (e.type) {
    case InteractionType.ApplicationCommand:
      applicationCommand(e, client);
      break;
    case InteractionType.MessageComponent:
      messageComponent(e, client);
      break;
    default:
      return;
  }
};

/**
 * コマンド名からコマンドオブジェクトを取得する
 * @param {string} name - コマンド名
 * @returns {Object|undefined} - コマンドオブジェクト(見つからない場合はundefined)
 */
const getCommand = name => commands.get(name);

/**
 * @param {import("discord.js").Interaction} e
 */
function applicationCommand(e, client) {
  if (commands.size === 0) {
    loadCommands();
  }
  const command = getCommand(e.commandName);
  if (command) {
    command.execute(e, client);
  }
}

/**
 * @param {import("discord.js").Interaction} e
 */
function messageComponent(e, client) {
  if (!e.customId) return;
  if (e.isButton()) executeButton(e.customId, e, client);
  if (e.isStringSelectMenu()) executeSelectMenu(e.customId, e, client);
}

/**
 * @param {string} id
 * @param {import("discord.js").ButtonInteraction} e
 * @param {import("discord.js").Client} client
 * @returns {ButtonInteraction}
 */
function executeButton(id, e, client) {
  const dir = path.join(env.root, 'interactions', 'buttons');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(dir, file));
    if (!command.data || !command.data.customId || !command.execute) {
      return logger.error(`Invalid command: ${file}. Missing customId or execute function.`);
    }
    if (command.data.customId === id) {
      return command.execute(e, client);
    }
  }
}

/**
 * 選択メニューのハンドリング
 *
 * @param {string} id
 * @param {StringSelectMenuInteraction} e
 * @param {import("discord.js").Client} client
 * @returns {Promise<void>}
 */
function executeSelectMenu(id, e, client) {
  const dir = path.join(env.root, 'interactions', 'selectMenus');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(dir, file));
    if (!command.data || !command.data.customId || !command.execute) {
      return logger.error(`Invalid command: ${file}. Missing customId or execute function.`);
    }
    return command.execute(e, client);
  }
}
