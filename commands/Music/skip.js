const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "Music",
    aliases: [ "s" ],
    description: "Skip Music",
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

        message.client.distube.skip(message);
    }
}