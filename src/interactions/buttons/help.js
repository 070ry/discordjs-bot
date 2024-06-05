/**
 * @type {import("../../types/button").Button}
 */
module.exports = {
  data: {
    customId: 'help',
  },
  execute(interaction) {
    interaction.reply({ content: 'こちらの機能は現在開発中です。', ephemeral: true });
  }
};
