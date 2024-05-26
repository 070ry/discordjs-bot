const env = require('../../data/env');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  /**
   *
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message} e
   */
  execute: async (client, e) => {
    await e.reply({
      embeds: [
        new EmbedBuilder({
          author: { name: client.user.tag, iconURL: client.user.displayAvatarURL() },
          title: 'Help',
          description: `${env.version}`,
        }),
      ],
    });
  },
};
