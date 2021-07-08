const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: "bird",
	description: "Sends a random bird image.",
	category: "Image",
	args: false,
	owner: false,
	usage: ``,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {
   
   const cyan = await fetch('http://shibe.online/api/birds');
   const img = (await cyan.json())[0];
   const embed = new MessageEmbed()
    .setTitle(`🐦 A Birdy !! 🐦`)
    .setImage(img)
    .setColor(message.client.color)
    .setFooter(`${message.client.user.username} Image`, message.client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);
  } 
 }

