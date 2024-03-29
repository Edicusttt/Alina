const { MessageEmbed } = require('discord.js');
const guilds = require('../../models/GuildProfile');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'goodbyetoggle',
  aliases: [],
  guildOnly: true,
  adminOnly: true,
  group: 'Setup',
  description: 'Toggle the \`Leaving Member Announcer\` on and off.',
  requiresDatabase: true,
  examples: [
    'goodbyetoggle'
  ],
  run: (client, message) => guilds.findById(message.guild.id, (err, doc) => {

    if (err){
      return message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` The database responded with error: ${err.name}`);
    };

    if (!doc){
      doc = new guilds({ _id: message.guild.id });
    };

    doc.greeter.leaving.isEnabled = !doc.greeter.leaving.isEnabled;

    doc.save()
    .then(() => {
      const state = ['Disabled', 'Enabled'][Number(doc.greeter.leaving.isEnabled)];
      const profile = client.guildProfiles.get(message.guild.id);
      profile.greeter.leaving.isEnabled = doc.greeter.leaving.isEnabled;

      return message.channel.send(
        new MessageEmbed()
        .setColor('GREEN')
        .setFooter(`Leaving Member Announcer | \©️${new Date().getFullYear()} Alina`)
        .setDescription([
          `${em.acm}\u2000\u2000|\u2000\u2000`,
          `Leaving Member Announcer Feature has been successfully **${state}**!\n\n`,
          `To **${!doc.greeter.leaving.isEnabled ? 're-enable' : 'disable'}** this`,
          `feature, use the \`${client.prefix}goodbyetoggle\` command.`,
          !profile.greeter.leaving.message ? '\n\u2000 \\⚠️ LMA Message has not been configured. ' : '',
          !profile.greeter.leaving.channel ? `\n\u2000 \\⚠️ LMA channel has not been set! Set one by using the \`${client.config.prefix}setgoodbyech\` command!` : ''
        ].join(' '))
      );}).catch(() => message.channel.send(`${em.error} | [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`));
  })
};
