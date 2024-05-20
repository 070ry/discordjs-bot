const { Client, GatewayIntentBits } = require("discord.js");
const config = require("../data/config");
const logger = require("../utils/logger");

/**
 * @returns {Promise<import("discord.js").Client>}
 */
module.exports.init = async () => {
  const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ];

  const allowedMentions = ["roles", "users"];

  logger.log("[ Client ] Initializing...");
  const client = new Client({
    intents,
    allowedMentions,
    failIfNotExists: false,
  });

  try {
    await client.login(config.general.token);
    return client;
  } catch (e) {
    throw new Error(e, { cause: "Invalid token" });
  }
};
