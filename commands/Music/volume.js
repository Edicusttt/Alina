const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "volume",
    category: "Music",
    aliases: [ "v", "vol"],
    description: "Set Volume",
    args: true,
    usage: "<Number of volume between 0 - 100>",
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

        const volume = parseInt(args[0])

        if (isNaN(volume)) {
            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`Please enter a valid number!`);
            return message.channel.send(embed);
        }
        
        message.client.distube.setVolume(message, volume);

        // Queue status template
        const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``;

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`**Volume** set to \`${volume}\``)
            .setFooter(`${message.client.user.username} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(embed);
    }
}