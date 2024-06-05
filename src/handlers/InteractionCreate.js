const { InteractionType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const env = require('../data/env');

const commands = new Map();
const root = path.join(env.root, 'interactions');

const validateCommand = command => {
  const missing = [];
  if (!command.data) missing.push('data');
  if (!command.data.name) missing.push('name');
  if (!command.data.description) missing.push('description');
  if (!command.execute) missing.push('execute');
  if (missing.length > 0) {
    throw new Error(`Invalid command: ${command.name}. Missing ${missing.join(', ')}.`);
  }
};

// handle interaction
module.exports = async (e, client) => {
  switch (e.type) {
    case InteractionType.ApplicationCommand:
      handleApplicationCommand(e, client);
      break;
    case InteractionType.MessageComponent:
      handleMessageComponent(e, client);
      break;
    default:
      return;
  }
};

const getCommand = name => commands.get(name);

const handleApplicationCommand = (e, client) => {
  if (commands.size === 0) {
    executeSLCommands();
  }
  const command = getCommand(e.commandName);
  if (command) {
    command.execute(e, client);
  }
};

const handleMessageComponent = (e, client) => {
  if (!e.customId) return;
  if (e.isButton()) executeButton(e.customId, e, client);
  if (e.isStringSelectMenu()) executeSelectMenu(e.customId, e, client);
};

const executeSLCommands = () => {
  const dir = path.join(root, 'commands');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(dir, file));
    validateCommand(command);
    commands.set(command.data.name, command);
    if (command.data.aliases) {
      command.data.aliases.forEach(alias => commands.set(alias, command));
    }
  }
};

const executeButton = (id, e, client) => {
  const dir = path.join(root, 'buttons');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(dir, file));
    validateCommand(command);
    if (command.data.customId === id) {
      return command.execute(e, client);
    }
  }
};

const executeSelectMenu = (id, e, client) => {
  const dir = path.join(root, 'selectMenus');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(dir, file));
    validateCommand(command);
    return command.execute(e, client);
  }
};
