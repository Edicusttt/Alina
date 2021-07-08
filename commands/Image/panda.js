const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: "panda",
	description: "Sends a random panda image.",
	category: "Image",
	args: false,
	owner: false,
	usage: `panda`,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {
  
   const cyan = await fetch('https://some-random-api.ml/img/panda');
   const img = (await cyan.json()).link;

   const embed = new MessageEmbed()
    .setTitle(`🐼 Panda ! 🐼`)
    .setImage(img)
    .setColor(message.client.color)
    .setFooter(`${message.client.user.username} Image`, message.client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);
  }
}