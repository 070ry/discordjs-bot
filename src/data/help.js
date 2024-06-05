const env = require('./env');

const { EmbedBuilder } = require('discord.js');
module.exports = {
  main: new EmbedBuilder({
    title: 'Help',
    description: `${env.version}`
  }),
  p2: new EmbedBuilder({
    title: 'Help Page 2',
    description: `${env.version}`
  })
};
