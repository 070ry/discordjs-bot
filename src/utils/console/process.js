const path = require('path');
const fs = require('fs');
const process = require('process');
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
  }
};

/**
 * Executes a console command.
 * @param {string} command - The command name.
 * @param {string[]} args - The command arguments.
 * @param {import('discord.js').Client} client - The Discord client.
 */
async function runCommand(command, args, client) {
  const dir = path.join(env.root, 'utils', 'console', 'commands');
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

  const matched = files.find(file => {
    const cmd = require(path.join(dir, file));
    return cmd.name === command;
  });

  if (matched) {
    const module = require(path.join(dir, matched));
    await module.execute(client, args);
  } else {
    logger.warn(`Console command not found: ${command}`);
  }
}
