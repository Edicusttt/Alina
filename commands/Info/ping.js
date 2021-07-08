const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Info",
    aliases: [],
    description: "Check Ping Bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Ping : **${client.ws.ping}**ms`)
            .setFooter(`Requested by ${message.author.tag}`);
        message.channel.send(embed);
    }
}