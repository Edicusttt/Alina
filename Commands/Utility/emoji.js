const { MessageEmbed } = require('discord.js');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'emoji',
  aliases: [],
  group: 'Utility',
  desciption: 'Display the larger version of the supplied emoji',
  parameters: [ 'emoji' ],
  examples: [
    'emoji :exampleonly:'
  ],
  get examples(){ return [ this.name + ' <emoji>'];},
  run: (client, message, [emoji = '']) => {
   
   const { color } = client.config;
    if (!emoji.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)){
      return message.channel.send(`\\${em.error} | ${message.author}, please enter a valid custom emoji!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor(color)
      .setImage('https://cdn.discordapp.com/emojis/' + emoji.match(/\d{17,19}/)[0])
      .setFooter(`Emoji: ${emoji.match(/\w{2,32}/)[0]} | \©️${new Date().getFullYear()} Alina`)
    );
  }
};
