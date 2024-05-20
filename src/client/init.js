const { Client, GatewayIntentBits, AllowedMentionsTypes } = require('discord.js')
const config = require('../data/config')
const logger = require('../utils/logger')

/**
 * Create a new Discord client instance
 * @returns {Promise<Client>} Discord client instance
 * @throws {Error} If the provided token is invalid
 */
module.exports.init = async () => {
  logger.log('[ Client ] Initializing...')

  const intents = config.client.intents

  const client = new Client({
    intents,
    failIfNotExists: false,
  })

  try {
    await client.login(config.general.token)
    return client
  } catch (error) {
    throw new Error('Invalid token', { cause: error })
  }
}
