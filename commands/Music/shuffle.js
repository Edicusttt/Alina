const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "shuffle",
    category: "Music",
    aliases: [],
    description: "Shuffle Music",
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

        message.client.distube.shuffle(message);

        // Queue status template
        const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``;

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`**Shuffle** the queue.`)
            .setFooter(`${message.client.user.username} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(embed);
    }
}