const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "play",
    category: "Music",
    aliases: [ "p" ],
    description: "Play Music",
    args: true,
    usage: "<YouTube URL | Video Name | Spotify URL>",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
  run: async (client, message, args) => {
        if (!message.guild.me.voice.channel) {
            message.member.voice.channel.join();
        } else {
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
         const embed = new MessageEmbed()
             .setColor(message.client.color)
             .setDescription(`You must be in the same channel as ${message.client.user}`);
                return message.channel.send(embed)
            }
        }
        
        try {
            message.client.distube.play(message, args.join(' '))
        } catch (e) {
           const embed = new MessageEmbed()
              .setColor(message.client.color)
              .setDescription(`Error: \`${e}\``);
            return message.channel.send(embed);
        }
    }
}