const profile = require('../../models/Profile');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'togglevotenotif',
  aliases: [],
  group: 'Setup',
  description: 'Toggles your vote notification on/off',
  requiresDatabase: true,
  parameters: [ ],
  examples: [ ],
  run: (client, message) => profile.findById(message.author.id, (err, doc) => {

    if (err){
      return message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` The database responded with error: ${err.name}`);
    };

    if (!doc){
      doc = new profile({_id: message.author.id});
    };

    const status = doc.data.vote.notification;
    doc.data.vote.notification = !status;

    return doc.save()
    .then(() => message.channel.send(`${em.success} | **${message.author.tag}**, successfully __${status ? 'Disabled' : 'Enabled'}__ the vote notifications. You will now **${status ? 'stop' : 'start'}** receiving DM notifications when voting me on **DisBotlist**.`))
    .catch(() => message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`));
  })
};
