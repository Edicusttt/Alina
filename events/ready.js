const consoleUtil = require(`${process.cwd()}/util/console`);
const text = require(`${process.cwd()}/util/string`);
const db = require("quick.db");
module.exports = async client => {

  consoleUtil.success(`${client.user.username} is now Online! (Loaded in ${client.bootTime} ms)\n\n`);
  const { color } = client.config;
  const bot = client.user.username;
  const icon = '<a:loading:865585984803307540>'
  const servers = text.commatize(client.guilds.cache.size);
  const members = text.commatize(client.guilds.cache.reduce((a,b) => a + b.memberCount, 0));
  const commands = client.commands.size;
  const boot = client.bootTime;
  const message = `${icon} \`[ ${client.version.client} ]\` **REBOOT**`;
  const embed = {
    color: color,
    description: [
      '```properties',
      `Servers: ${servers}`,
      `Members: ${members}`,
      `Command: ${commands}`,
      `Boot: ${boot}ms`,
      '```'
    ].join('\n')
  };
     
await client.channels.cache.get(client.config.channels.logs).createWebhook(bot, {
    avatar: client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 128 })
  })
  .then(webhook => Promise.all([webhook.send(message, { embeds: [embed] }), webhook]))
  .then(([_, webhook]) => webhook.delete())
  .catch(() => {});

  // add more functions on ready  event callback function...

  return;
};
