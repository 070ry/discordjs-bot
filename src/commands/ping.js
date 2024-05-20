module.exports = {
  data: {
    name: 'ping',
    description: 'BotのPingを表示します',
    aliases: ['delay'],
  },
  execute(interaction, client) {
    const start = Date.now()
    interaction.reply({ content: 'Ping値を計算しています...', ephemeral: true }).then((message) => {
      const end = Date.now()
      message.edit(`Websocket Ping: ${client.ws.ping}ms\nInteraction response delay: ${end - start}ms`)
    })
  },
}
