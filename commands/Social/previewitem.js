const market = require('../../assets/json/market.json');
const text = require('../../util/string');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'previewitem',
  aliases: [ 'viewitem' ],
  rankcommand: true,
  clientPermissions: [ 'MANAGE_MESSAGES', 'ATTACH_FILES' ],
  group: 'Social',
  description: 'Check what you can buy from the shop.',
  requiresDatabase: true,
  parameters: [ 'item ID' ],
  examples: [
    'previewitem 13',
    'viewitem 4'
  ],
  run: async (client, message, [id]) => {

    if (!id){
      return message.channel.send(`${em.error} | **${message.author.tag}**,Please specify the id!`);
    };
    
    let selected = market.find(x => x.id == id);

    if (!selected){
      return message.channel.send(`${em.error} | **${message.author.tag}**, Could not find the item with that id!`);
    };

    return message.channel.send(`name: **${selected.name}**, type: **${selected.type}**, price: **${text.commatize(selected.price)}**`,{
      embed: { image: { url: selected.assets.link }, color: 0x9933ff }
    })
  }
};
