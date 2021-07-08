const { MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: "invite",
    category: "info",
    aliases: [ "inv" ],
    description: "Invite Link",
    args: false,
    usage: "",
    permission: [],
    owner: false,
  run: async (client, message, args) => {
      const FirstEmbed = new MessageEmbed()
        .setTitle(`${client.user.username}`)
        .setDescription(`Want to invite me to your server? than [click here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) to invite me to your server.`)
        .setColor(message.client.color)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        const invite = new MessageButton()
        .setStyle(`url`)
        .setLabel(`Invite`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)

        message.channel.send({ button: invite, embed: FirstEmbed })

    }
};