module.exports = async (client, guild) => {
	client.users.fetch(`${client.owner}`).then(user => {
        user.send(`🔔 Joined: ${guild.name} (${guild.id}) - ${guild.members.cache.size} members`);
	})
}