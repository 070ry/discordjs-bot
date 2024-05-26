const path = require('path');
const fs = require('fs');

const env = require('../../data/env');
const logger = require('../logger');

/**
 * Module for handling console commands.
 * @module utils/console/process
 */
module.exports = {
  /**
   * Starts the console listener.
   * @param {import('discord.js').Client} client - The Discord client.
   */
  console: async client => {
    process.stdin.on('data', async input => {
      const args = input.toString().trim().split(' ');
      const command = args.shift();

      if (!command) return;
      await runCommand(command, args, client);
    });

    logger.log('[ process ] Console listener started.');
  },
};

/**
 * Executes a console command.
 * @param {string} command - The command name.
 * @param {string[]} args - The command arguments.
 * @param {import('discord.js').Client} client - The Discord client.
 */
async function runCommand(command, args, client) {
  const commandsDirectory = path.join(env.root, 'utils', 'console', 'commands');
  const files = fs.readdirSync(commandsDirectory).filter(file => file.endsWith('.js'));

  const matchedCommand = files.find(file => {
    const cmd = require(path.join(commandsDirectory, file));
    return cmd.name === command;
  });

  if (matchedCommand) {
    const commandModule = require(path.join(commandsDirectory, matchedCommand));
    await commandModule.execute(client, args, commandModule);
  } else {
    logger.warn(`Console command not found: ${command}`);
  }
}
