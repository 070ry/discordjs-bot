const fs = require('fs')

/**
 *
 * @param {import("discord.js").Interaction} e
 * @param {import("discord.js").Client} client
 * @param {import("../data/config")} config
 */
module.exports = async (e, client, config) => {
  const { log } = require('../utils/logger')
  log(`[ Events/MessageCreate ] ${e.user.username}`)
  const dir = config.general.__root + '/commands'

  const files = await fs.readdirSync(dir).filter((file) => file.endsWith('.js'))

  for await (const file of files) {
    const command = require(`${dir}/${file}`)
    if (command.data.name === e.commandName || command.data.aliases?.includes(e.commandName)) {
      command.execute(e, client)
    }
  }
}
