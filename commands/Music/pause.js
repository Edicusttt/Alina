const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "pause",
    category: "Music",
    aliases: [ ],
    description: "pause Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
  run: async (client, message, args) => {
        const queue = message.client.distube.getQueue(message);

        if(!queue) {
           const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`There is no music playing.`);
            return message.channel.send(embed);
        }

        // Queue status templat
        const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``;

        if (queue.pause) {
            message.client.distube.resume(message)
            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
                .setDescription(`**Resumed** the song!`)
                .setFooter(`${message.client.user.username} Music`, message.client.user.displayAvatarURL());
            return message.channel.send(embed);
        }

        message.client.distube.pause(message)
        
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`**Paused** the song!`)
            .setFooter(`${message.client.user.username} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(embed);
    }
}