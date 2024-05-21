const files = require('fs')
  .readdirSync('./src/handlers')
  .filter(file => file.endsWith('.js'));

module.exports.Handlers = files.reduce((handlers, file) => {
  const name = file.replace(/\.js$/, '');
  handlers[name] = require(`./handlers/${name}`);
  return handlers;
}, {});

module.exports.Events = require('discord.js').Events;
