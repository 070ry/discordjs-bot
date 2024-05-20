const logger = require('../utils/logger')
const { Collection } = require('discord.js')
const fs = require('fs')

/**
 * メッセージを受け取ったときの処理
 * @param {import("discord.js").Message} e - 受け取ったメッセージ
 * @param {import("discord.js").Client} client - Discordのクライアント
 * @param {import("../data/config")} config - 設定
 */
module.exports = async (e, client, config) => {
  const content = e.content
  if (!content.startsWith(config.general.prefix)) return
  const command = content.split(' ')[0]

  if (command === config.general.prefix + 'sync') {
    const reply = await e.reply('コマンドをアップデートしています...')
    try {
      const dir = config.general.__root + '/commands'
      const files = await fs.readdirSync(dir).filter((file) => file.endsWith('.js'))

      client.commands = await new Collection()
      for await (const file of files) {
        /**
         * @type {import("discord.js").ApplicationCommand}
         */
        const command = require(`${dir}/${file}`)
        client.commands.set(command.data.name, command)
        if (command.data.aliases) {
          for (const alias of command.data.aliases) {
            const object = {
              ...command.data,
              name: alias,
            }
            client.commands.set(alias, {
              ...command,
              data: object,
            })
          }
        }
      }
      await client.guilds.cache.forEach((guild) => {
        guild.commands.set(client.commands.map((cmd) => cmd.data))
      })
      reply.edit('コマンドをアップデートしました。')
    } catch (error) {
      logger.error(error)
      reply.edit('アップデートに失敗しました。')
    }
  }
}
