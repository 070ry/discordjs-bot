const handlers = {};
const events = require('discord.js').Events;

for (const file of require('fs').readdirSync('./src/handlers')) {
  if (file.endsWith('.js')) {
    const name = file.slice(0, -3);
    handlers[name] = require(`./handlers/${name}`);
  }
}

module.exports.Handlers = handlers;
module.exports.Events = events;
