const { EmbedBuilder } = require('discord.js');

/**
 * @type {import("../../types/command").Command}
 */
module.exports = {
  data: {
    name: 'log'
  },
  execute: async (client, e, args) => {
    const channel = client.channels.cache.get('1247733509230039151');

    const message = args.join(' ');
    await channel.send({
      embeds: [
        new EmbedBuilder({
          author: { name: client.user.tag, iconURL: client.user.displayAvatarURL() },
          title: 'Log',
          description: `${message}`
        })
      ]
    });
  }
};
