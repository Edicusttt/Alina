const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    let PREFIX = await db.get(`prefix_${message.guild.id}`)
    if(PREFIX === null) client.prefix = PREFIX;
    
    if(message.content.match(new RegExp(`^<@!?${message.client.user.id}>( |)$`))) return message.channel.send(`Hello **${message.author.username}**, my prefix is \`${PREFIX}\`. Use \`${PREFIX}help\` to get the list of the commands!`);

    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    const embed = new MessageEmbed()
        .setColor("RANDOM");

    // args: true,
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
        	reply += `\nUsage: \`${PREFIX}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send(embed);
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("You can't use this command!");
        return message.channel.send(embed);
    }

    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription("Only Bot Owner can use this command!");
        return message.channel.send(embed);
    }

    if (command.inVoiceChannel && !message.member.voice.channel) {
        embed.setDescription("You must be in a voice channel!");
        return message.channel.send(embed);
    }

    if (command.sameVoiceChannel && message.member.voice.channel !== message.guild.me.voice.channel) {
        embed.setDescription(`You must be in the same channel as ${message.client.user}!`);
        return message.channel.send(embed);
    }

    try {
        command.run(client, message, args);
    } catch (error) {
        console.log(error);
        embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
        return message.channel.send(embed);
    }
};
