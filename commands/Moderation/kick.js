const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../assets/emoji.json');
module.exports = {
	name: "kick",
	description: "Kick a user from the guild.",
	category: "Moderation",
	args: false,
	owner: false,
	usage: "",
	aliases: [],
	permissions: ["KICK_MEMBERS"],
run: async (client, message, args) => {
   
   const Perms = ["KICK_MEMBERS" || "ADMINSTRATOR"]
   const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
   let reason = args.slice(2).join(' ');
        if (!reason) reason = '`-`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if(!message.member.permissions.has(Perms)){
            return message.channel.send(new MessageEmbed()
            .setDescription(`${emoji.Error} You Don't Have Permission To Kick Members! Missing Perms - [KICK_MEMBERS]`, message.guild))
        }
        if(!message.guild.me.permissions.has(Perms)){
            return message.channel.send(new MessageEmbed()
            .setDescription(`${emoji.Error} I Don't Have Permission To Kick Members! Missing Perms - [KICK_MEMBERS]`, message.channel));
        }
        if(!target){
            return message.channel.send(new MessageEmbed()
            .setDescription(`${emoji.Error} Please Enter A User And User Id to Kick`, message.channel));
        }
        
        if(target.id === message.guild.owner){
            return message.channel.send(new MessageEmbed()
            .setDescription(`${emoji.Error} You Cant Kick The Owner Jerk!`, message.channel))
        }
        if(target.id === message.author){
            return message.channel.send(new MessageEmbed()
            .setDescription(`${emoji.Error} You Can't Kick Yourself!`))
        }
        if(target.kickable){
    
    await target.kick(reason);
    
    const embed = new MessageEmbed()
      .setTitle(`${emoji.leave} Kick Member`)
      .setDescription(`${emoji.Ok} ${target} was successfully kicked.`)
      .addField('Moderator', message.member, true)
      .addField('Member', target, true)
      .addField('Reason', reason)
      .setColor(message.client.color)
      .setFooter(`${message.client.user.username} Moderation`, message.client.user.displayAvatarURL)
      .setTimestamp()
        message.channel.send(embed)
        target.kick()
    } else {
       message.channel.send("Please Check My Role, Or Make My Role Is Higher Than Everyone!")
        }
    }
}