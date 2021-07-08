const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "queue",
    category: "Music",
    aliases: [ "q" ],
    description: "Queue Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
  run: async (client, message, args) => {
         const queue = message.client.distube.getQueue(message);

        if(!queue) {
            let embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`There is no music playing.`);
            return message.channel.send(embed);
        }

        // Queue status templat
        const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``;

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription('Current queue:\n' + queue.songs.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - [${song.user}] \`${song.formattedDuration}\``).slice(0, 10).join("\n"))
            .setFooter(`${message.client.user.username} ~ ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send(embed);
    }
}