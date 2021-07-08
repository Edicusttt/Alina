const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
    name: "24h",
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
   
   if(message.author.id != "491577179495333903") {
            return message.channel.send("Only Bot Owner Can Use This Command")
        }

        if (!message.member.voice.channel) {
          return message.reply('You Need To Join Voice Channel')
        }

        const guildid = message.guild.id
        db.set(`vc_${guildid}`, message.member.voice.channel.id)

        message.channel.send(`Sucessfully set the 24/7 vc to <#${message.member.voice.channel.id}>`)
    }
}