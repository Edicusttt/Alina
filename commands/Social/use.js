const text = require('../../util/string');
const profile = require('../../models/Profile');
const market = require('../../assets/json/market.json');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'use',
  aliases: [ 'equip' ],
  rankcommand: true,
  clientPermissions: [ 'MANAGE_MESSAGES' ],
  group: 'Social',
  description: 'Equips an item.',
  requiresDatabase: true,
  paramters: [ 'item ID' ],
  examples: [
    'equip 67',
    'use 15'
  ],
  run: (client, message, [id] ) => profile.findById(message.author.id, async (err, doc) => {

    if (err){
      return message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` The database responded with error: ${err.name}`);
    } else if (!doc){
      doc = new profile({ _id: message.author.id });
    };

    const item = doc.data.profile.inventory.find(x => x.id == id);

    if (!item){
      return message.channel.send(`${em.error} | **${message.author.tag}**, you do not have this item in your inventory!`);
    };

    const metadata = market.find(x => x.id === item.id);

    if (!metadata){
      return message.channel.send(`${em.error} | **${message.author.tag}**, this item can no longer be used!`);
    };

    doc.data.profile[metadata.type] = metadata.assets.link;

    return doc.save()
    .then(() => message.channel.send(`${em.success} | **${message.author.tag}**, successfully used **${metadata.name}!**`))
    .catch(() => message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`));
  })
};
