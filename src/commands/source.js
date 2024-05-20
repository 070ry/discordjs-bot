module.exports = {
  data: {
    name: 'source',
    description: 'Botのソースコードが置かれているGitリポジトリのURLを表示します',
    aliases: ['repo', 'repository', 'src', 'git'],
  },
  execute(interaction, client) {
    const start = Date.now()
    interaction.reply({ content: 'Github: https://github.com/070ry/discordjs-bot', ephemeral: true })
  },
}
