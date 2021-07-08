const superagent = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "baka",
	description: "Sends a random baka image.",
	category: "Fun",
	args: false,
	owner: false,
	usage: ``,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {
   superagent.get('https://nekos.life/api/v2/img/baka')
        .end((err, response) => {
    const embed = new MessageEmbed()
      .setTitle("BAKA!!!")
      .setImage(response.body.url)
      .setColor(message.client.color)
      .setURL(response.body.url);
      
  message.channel.send(embed);
     
        })

   }
}
