const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../assets/emoji.json');
const ms = require('ms');
module.exports = {
	name: "mute",
	description: "Mute a user from the guild.",
	category: "Moderation",
	args: false,
	owner: false,
	usage: "<user> [reason]",
	aliases: [],
	permissions: ["MANAGE_ROLES"],
run: async (client, message, args) => {

	const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

	if(!member) return client.oops(message.channel, `Please provide a user.`)

	let reason = args.slice(1).join(" ")
	if (!reason) reason = "No reason provided.";

	const muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === "muted")

	if(muteRole) {
		await message.guild.channels.cache.filter(ch => ch.type === "text").forEach(async (channel) => {
			await channel.updateOverwrite(muteRole, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false
			})
		})

		if (member.roles.cache.has(muteRole.id)) return client.oops(message.channel, `${member.user.tag} is already muted.`)

		await member.roles.add(muteRole).then(async () => {
			client.good(message.channel, `${member.user.tag} has been muted by ${message.author.tag}.`)
			client.mod(member, `You've been muted in ${message.guild.name} by ${message.author.tag}\n\nReason: ${reason}`)

			await message.channel.send(embed)
		}).catch(err => {
			client.oops(message.channel, ee)
		})
	} else {
		await message.guild.roles.create({
			data: {
				name: "muted",
				permissions: []
			}
		}).then(async (muterole) => {
			await message.guild.channels.cache.filter(c => c.type === "text").forEach(async (channel) => {
				await channel.updateOverwrite(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				})
			})

			if (member.roles.cache.has(muterole.id)) return client.oops(message.channel, `${member.user.tag} is already muted.`)

			await member.roles.add(muterole).then(() => {
				client.good(message.channel, `${member.user.tag} has been muted by ${message.author.tag}.`)
				client.mod(member, `You've been muted in ${message.guild.name} by ${message.author.tag}\n\nReason: ${reason}`)
			})
		}).catch(err => {
			client.oops(message.channel, err)
		})
	}
}      
        
}
 