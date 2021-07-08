const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../assets/emoji.json');
module.exports = {
	name: "clear",
	description: "Clears the chat",
	category: "Moderation",
	args: false,
	owner: false,
	usage: "",
	aliases: [],
	permissions: ["MANAGE_MESSAGES"],
run: async (client, message, args) => {
    
     const Perms = ["MANAGE_MESSAGES" || "ADMINSTRATOR"]

        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission(Perms)) {
            return message.channel.send(new MessageEmbed() 
            .setDescription(`${emoji.Error} You can't delete messages.. since you don't have permission to do it ask admin or owner to give you permission **\`MANAGE_MESSAGES\`** !!`))
        }

        if (!message.guild.me.hasPermission(Perms)) {
            return message.channel.send(new MessageEmbed() 
            .setDescription(`${emoji.Error} Sorryy... I can't delete messages I don't have permission to do that pls enable permission **\`MANAGE_MESSAGES\`**`));
          
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send(new MessageEmbed()
            .setDescription(`${emoji.Error} Please provide a number between 1 & 100 rather than an alphabet, blank space or 0`));
            
        }

        if (parseInt(args[0]) > 100) 
        return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.Error} Welp I can only clear \`100\` messages maximum`))
        .then(msg => {
            msg.delete({ timeout: 15000 })
        })

        let deleteAmount = parseInt(args[0]);  

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`${emoji.Ok} I deleted \`${deleted.size}\` messages.`))
            .then(msg => {
                msg.delete({ timeout: 3000 })
              })
            
    }
} 