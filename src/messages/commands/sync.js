const env = require('../../data/env');
const { EmbedBuilder } = require('discord.js');

/**
 * @type {import("../../types/command").Command}
 */
module.exports = {
  data: {
    name: 'help',
    description: 'ヘルプパネルを表示します'
  },
  execute: async (client, e) => {
    await e.reply({
      embeds: [
        new EmbedBuilder({
          author: { name: client.user.tag, iconURL: client.user.displayAvatarURL() },
          title: 'Help',
          description: `${env.version}`
        })
      ]
    });
  }
};
