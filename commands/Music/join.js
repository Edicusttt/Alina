const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "join",
    category: "Music",
    aliases: [ "" ],
    description: "Join Voice Channel",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
  run: async (client, message, args) => {
       if (!message.guild.me.voice.channel) {
            message.member.voice.channel.join();

           const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
                .setDescription("**Join** the voice channel.")
                .setFooter(`${message.client.user.username} Music`, message.client.user.displayAvatarURL());
            return message.channel.send(embed);
        } else {
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
              const embed = new MessageEmbed()
                    .setColor(message.client.color)
                    .setDescription(`You must be in the same channel as ${message.client.user}`);
                return message.channel.send(embed)
            }
        }
    }
}