const { MessageEmbed } = require('discord.js');
const got = require('got');

module.exports = {
	name: "meme",
	description: "Sends a random meme.",
	category: "Fun",
	args: false,
	owner: false,
	usage: ``,
	aliases: [],
	permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
run: async (client, message, args) => {
   
   const embed = new MessageEmbed()
        got('https://reddit.com/r/dankmemes/random.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor(message.client.color)
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed);
        })

}    }