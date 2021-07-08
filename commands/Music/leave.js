const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    category: "Music",
    aliases: [ "dc" ],
    description: "Leave Voice Channel",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
  run: async (client, message, args) => {
        const queue = message.client.distube.getQueue(message);

        if(!queue) {
            message.member.voice.channel.leave();
        } else {
	    message.client.distube.stop(message);
	    message.member.voice.channel.leave();
	}

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription("**Leave** the voice channel.")
            .setFooter(`${message.client.user.username} Music`, message.client.user.displayAvatarURL());
        return message.channel.send(embed);
    }
}