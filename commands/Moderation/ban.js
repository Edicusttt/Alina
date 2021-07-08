const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../assets/emoji.json');
module.exports = {
	name: "ban",
	description: "Ban a user from the guild.",
	category: "Moderation",
	args: false,
	owner: false,
	usage: "",
	aliases: [],
	permissions: ["BAN_MEMBERS"],
run: async (client, message, args) => {
     const Perms = ["BAN_MEMBERS" || "ADMINSTRATOR"]
     const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if(!message.guild.me.permissions.has(Perms)){
        return message.channel.send(new MessageEmbed() 
        .setDescription(`${emoji.Error} I Don't Have Permission To Ban Members!`, message.channel))
         }
        if(!message.member.permissions.has(Perms)){
            return message.channel.send(new MessageEmbed() 
            .setDescription(`${emoji.Error} You Dont Have Permission To Ban Members!`, message.channel))
        }
        if(!target){
            return message.channel.send(new MessageEmbed() 
            .setDescription(`${emoji.Error} Please Mention A User`, message.channel))
        }
        
        if(target === message.guild.owner){
            return message.channel.send(new MessageEmbed() .setDescription(`${emoji.Error} What? You Can't Ban Owner!`, message.channel))
        }
        if(target === message.author){
            return message.channel.send(new MessageEmbed() 
            .setDescription(`${emoji.Error} I Will Ban You Sometimes`))
        }
    if(target.bannable){
    
    await target.ban({ reason: reason });
   
    const embed = new MessageEmbed()
      .setTitle(`${emoji.ban} Ban Member`)
      .setDescription(`${emoji.Ok} ${target} was successfully banned.`)
      .addField('Moderator', message.member, true)
      .addField('Member', target, true)
      .addField('Reason', reason)
      .setColor(message.client.color)
      .setFooter(`${message.client.user.username} Moderation`, message.client.user.displayAvatarURL)
      .setTimestamp()
      message.channel.send(embed);
      target.ban()
    } else {
    return message.channel.send(`${emoji.Error} Please Check My Role, Or Make My Role Higher Than Everyone.`, message.channel)
    }    
  }
}