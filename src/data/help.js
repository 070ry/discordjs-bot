const env = require('./env');

const { EmbedBuilder } = require('discord.js');
module.exports = {
  main: new EmbedBuilder({
    title: 'Help',
    description: `${env.version}`,
  }),
};
