const { Client, Collection, MessageEmbed } = require(`discord.js`);
const PREFIX = process.env.PREFIX;
const db = require('quick.db');

module.exports = {
	name: "prefix",
	description: "The main help command of the bot.",
	category: "Config",
	args: false,
	owner: false,
	usage: "",
	aliases: ["setprefix"],
	permissions: ["ADMINISTRATOR"],
run: async (client, message, args) => {
   
    let PREFIX = await db.get(`prefix_${message.guild.id}`)
    if(PREFIX === null) PREFIX = client.prefix;
   
    if(!args[0]) return message.channel.send(new MessageEmbed()
    .setColor(message.client.color)
    .setTitle(`Current Prefix: \`${prefix}\``)
    .setFooter('Please provide a new prefix')
    );
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()
    .setColor(message.client.color)
    .setTitle(` You don\'t have permission for this Command!`)
    );

    if(args[1]) return message.channel.send(new MessageEmbed()
    .setColor(message.client.color)
    .setTitle(`'The prefix can\'t have two spaces'`));

    db.set(`prefix_${message.guild.id}`, args[0])

    message.channel.send(new MessageEmbed()
    .setColor(message.client.color)
    .setTitle(`Successfully set new prefix to **\`${args[0]}\`**`))
  }
}
