const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: "dog",
	description: "Sends a random dog image.",
	category: "Image",
	args: false,
	owner: false,
	usage: `dog`,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {

   const cyan = await fetch('https://dog.ceo/api/breeds/image/random');
   const img = (await cyan.json()).message;
   const embed = new MessageEmbed()
    .setTitle(`🐕 Ayy our Dog 🐕`)
    .setImage(img)
    .setColor(message.client.color)
    .setFooter(`${message.client.user.username} Image`, message.client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);
    }
}
