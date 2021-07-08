const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: "cat",
	description: "Sends a random cat image.",
	category: "Image",
	args: false,
	owner: false,
	usage: `cat`,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {

    const cyan = await fetch('https://some-random-api.ml/img/cat');
    const img = (await cyan.json()).link;
    const embed = new MessageEmbed()
    .setTitle(`🐈 Meow !!! 🐈`)
    .setImage(img)
    .setColor(message.client.color)
    .setFooter(`${message.client.user.username} Image`, message.client.user.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);
  }
}