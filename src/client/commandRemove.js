module.exports = async client => {
  console.log(`Deleting all commands for ${client.user.tag}...`);
  for (const guild of client.guilds.cache.values()) {
    const commands = await guild.commands.fetch();
    if (commands) {
      for (const command of commands.values()) {
        console.log(`Removed: ${command.name} (${command.id})`);
        await command.delete();
      }
    }
  }
};
