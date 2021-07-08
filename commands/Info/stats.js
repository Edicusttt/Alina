const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "stats",
    category: "Info",
    aliases: [ "sts" ],
    description: "Show status bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    run: async (client, message, args) => {
        const duration1 = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const cpu = await si.cpu();
        const embed = new MessageEmbed()
            .setColor(client.color)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(`Request by: ${message.author.tag}`)
            .setDescription(`**Status**
**__ STATISTICS __**
**• Servers** : ${client.guilds.cache.size.toLocaleString()}
**• Channels** : ${client.channels.cache.size.toLocaleString()}
**• Users** : ${client.users.cache.size.toLocaleString()}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**__ SYSTEM __**
**• Platfrom** : ${os.type}
**• Uptime** : ${duration1}
**• CPU** :
> **• Cores** : ${cpu.cores}
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
**• MEMORY** :
> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
`);
        message.channel.send(embed);
    }
}