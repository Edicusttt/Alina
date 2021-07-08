const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: "fox",
	description: "Sends a random fox image.",
	category: "Image",
	args: false,
	owner: false,
	usage: `fox`,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {
   
   const cyan = await fetch('https://randomfox.ca/floof/');
   const img = (await cyan.json()).image;
   const embed = new MessageEmbed()
    .setTitle(`🦊 Aww Foxxy 🦊`)
    .setImage(img)
    .setColor(message.client.color)
    .setFooter(`${message.client.user.username} Image`, message.client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);
          
  }   
}   