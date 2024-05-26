const env = require('../../data/env');

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require('discord.js');
/** @type {import('../../types/commands').Command} */
module.exports = {
  data: {
    name: 'help',
    description: 'ヘルプパネルを表示します',
  },
  execute(interaction, client) {
    const embed = new EmbedBuilder({
      author: {
        name: client.user.tag,
        iconURL: client.user.displayAvatarURL(),
      },
      title: 'Help',
      description: `${env.version}`,
    });
    const row = new ActionRowBuilder({
      components: [{ type: ComponentType.StringSelect, customId: 'help', options: [{ label: 'Help', value: 'help' }] }],
    });
    interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};
