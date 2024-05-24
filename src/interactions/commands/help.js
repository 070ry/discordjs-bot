/**
 * ヘルペパネルを表示するコマンド
 *
 * @type {import("../../types/commands").Command}
 */
module.exports = {
  data: {
    name: 'help',
    description: 'ヘルプパネルを表示します',
  },
  execute(interaction, client) {
    interaction.reply({ content: 'こちらの機能は現在開発中です。', ephemeral: true });
  },
};
