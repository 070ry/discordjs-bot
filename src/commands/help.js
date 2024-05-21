module.exports = {
  data: {
    name: 'help',
    description: 'Botのヘルプパネルを表示します',
    aliases: ['helppanel'],
  },
  execute(interaction, client) {
    const start = Date.now();
    interaction.reply({ content: 'こちらの機能は現在開発中です。', ephemeral: true });
  },
};
