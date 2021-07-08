const superagent = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "joke",
	description: "Get Some Fun Jokes.",
	category: "Fun",
	args: false,
	owner: false,
	usage: ``,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {
  
   await superagent
        .get('http://icanhazdadjoke.com/')
        .set('Accept', 'application/json')
		   .end((err, response) => {
    const embed = new MessageEmbed()
        .setTitle("Joke")
        .setDescription(response.body.joke)
        .setColor(message.client.color);
        
        message.channel.send(embed);
		})
  }
}