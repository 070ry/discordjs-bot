const { Client } = require('discord.js')
const config = require('../data/config')
const { log } = require('../utils/logger')

/**
 * @returns {Promise<import("discord.js").Client>}
 */
module.exports.init = async () => {
  log('[ Client ] Initializing...')

  const intents = config.client.intents
  const allowedMentions = config.client.allowedMentions

  const client = new Client({
    intents,
    allowedMentions,
    failIfNotExists: false,
  })

  try {
    await client.login(config.general.token)
    return client
  } catch (e) {
    throw new Error(e, { cause: 'Invalid token' })
  }
}
