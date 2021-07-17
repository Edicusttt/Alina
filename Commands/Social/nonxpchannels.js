const { MessageEmbed } = require('discord.js');
const text = require('../../util/string');
const em = require('../../assets/json/emojis.json');

module.exports = {
  name: 'nonxpchannels',
  aliases: [],
  guildOnly: true,
  adminOnly: true,
  group: 'Social',
  description: 'See which channels do not give xp',
  requiresDatabase: true,
  examples: [
    'nonxpchannels'
  ],
  run: (client, message) => {

    const { color } = client.config;
    let totalch = message.guild.channels.cache.filter(c => c.send).size;
    let channels = client.guildProfiles.get(message.guild.id).xp.exceptions;
    channels = channels.map(x => client.channels.cache.get(x).toString());

    if (!channels.length){
      return message.channel.send(`${em.success} | **${message.member.displayName}**, All channels in this server are xp-enabled!`);
    } else if (totalch === channels.length){
      return message.channel.send(`${em.error} | **${message.member.displayName}**, All channels in this server are xp-disabled!`);
    } else {
      return message.channel.send(
        new MessageEmbed()
        .setColor(color)
        .setFooter(`XP | \©️${new Date().getFullYear()} Alina`)
        .setDescription([
            '\\⚠️\u2000\u2000|\u2000\u2000',
            `XP SYSTEM are disabled on ${text.joinArray(channels)}`
        ].join(''))
      )
    };
  }
};
