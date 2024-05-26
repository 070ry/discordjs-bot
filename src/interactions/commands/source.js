/**
 * @type {import("../../types/command").Command}
 */
module.exports = {
  data: {
    name: 'source',
    description: 'Botのソースコードが置かれているGitリポジトリのURLを表示します',
    aliases: ['repository']
  },
  execute(interaction) {
    interaction.reply({ content: 'Github: https://github.com/070ry/discordjs-bot', ephemeral: true });
  }
};
