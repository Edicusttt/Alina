const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../assets/emoji.json');
module.exports = {
	name: "addrole",
	description: "Add the role to the mentioned user or ID with mentioned role or ID.",
	category: "Moderation",
	args: false,
	owner: false,
	usage: "",
	aliases: ["addr", "role", "giverole"],
	permissions: ["MANAGE_ROLES"],
run: async (client, message, args) => {
    
    const Perms = ["MANAGE_ROLES" || "ADMINSTRATOR"]
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    const role = message.mentions.roles.first(message, args[1]) || message.guild.roles.cache.get(args[1]);
    
    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

     if(!message.member.hasPermission(Perms)) 
        return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.Error} You do not have the permission to addrole try asking a staff to give you the permission **\`MANAGE_ROLES\`** or **\`ADMINISTRATOR\`**`))
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });
     if(!message.guild.me.permissions.has(Perms))
        return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.Error} I do not have permission to addrole pls enable permission **\`MANAGE_ROLES\`** or **\`ADMINSTRATOR\`** for me`))
     if (!target)
        return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.Error} Please specify someone you want to give the role!! **\`addrole [User] [Role Mention or Role ID]\`**`))

     if (!role)
        return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.Error} Please mention a role or provide a valid role ID`))

        if (target.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.Error} You cannot give a role to someone who is higher or equal to your role`))

        if (target.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.Error} You cannot give a role to someone who is higher or equal to my role`))

        else if (target.roles.cache.has(role.id))
        return message.channel.send(new MessageEmbed().setDescription(`${emoji.Error} User already has the provided role`));

    else {
      try {

        // Add role
        await target.roles.add(role);
        const embed = new MessageEmbed()
          .setTitle(`${emoji.add} Add Role`)
          .setDescription(`${emoji.Ok} ${role} was successfully added to ${target}.`)
          .addField('Moderator', message.member, true)
          .addField('Member', target, true)
          .addField('Role', role, true)
          .addField('Reason', reason)
          .setColor(message.client.color)
          .setFooter(`${message.client.user.username} Moderation`, message.client.user.displayAvatarURL)
          .setTimestamp()
        message.channel.send(embed);

      } catch (err) {
        return message.channel.send(message, 1, 'Please check the role hierarchy', err.message);
      }
    }  
  }
};