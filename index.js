const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");
const { PREFIX, COOKIE, OWNERID, EMBEDCOLOR } = require("./config.json");
const Cyan = process.env['TOKEN']
const DisTube = require('distube');
const client = new Client({
    disableMentions: "everyone",
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    ws: { intents: Intents.ALL }
});

require("discord-buttons")(client);
const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);
client.distube = new DisTube(client, {
    youtubeCookie: COOKIE,
    requestOptions: {
        agent
    },
    searchSongs: true,
    emitNewSongOnly: true,
    highWaterMark: 1024 * 1024 * 64,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    searchSongs: false,
    youtubeDL: true,
    updateYouTubeDL: false,
})


client.config = require("./config")
client.prefix = process.env.PREFIX;
client.owner = OWNERID;
client.queue = new Map();
client.aliases = new Collection();
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.color = EMBEDCOLOR;
client.oops = function oops(channel, args) {
	const embed = new MessageEmbed()
	.setDescription(`**${args}**`)
	.setColor(`RED`)

	channel.send(embed)
}

client.good = function good(channel, args) {
	const embed = new MessageEmbed()
	.setDescription(`**${args}**`)
	.setColor(`GREEN`)

	channel.send(embed)
}

client.mod = function mod(channel, args) {
	const embed = new MessageEmbed()
	.setDescription(`**${args}**`)
	.setColor(`RED`)

	channel.send(embed).catch(e => { return; })
}


// Client Event 
readdirSync("./events/").forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading Events Client ${eventName}`);
    client.on(eventName, event.bind(null, client));
});

// Inport All Commands

readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        console.log(`Loaded ${command.category}, Command:  ${command.name}`);
        client.commands.set(command.name, command);
    }
});

// Error Handler

client.on("disconnect", () => console.log("Bot is disconnecting..."))
client.on("reconnecting", () => console.log("Bot reconnecting..."))
client.on('warn', error => console.log(error));
client.on('error', error => console.log(error));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));
 
// DisTube Event


const status = queue => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\``
client.distube
    .on("addList", (message, queue, playlist) => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Added **${playlist.title}** playlist (${playlist.total_items} songs) to the queue - [${song.user}]`)
            .setThumbnail(playlist.thumbnail)
            .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.client.user.displayAvatarURL());
        message.channel.send(embed);
    })
    .on("addSong", (message, queue, song) => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Added **[${song.name}](${song.url})** - [${song.user}] \`[${song.formattedDuration}]\` to the queue`)
            .setThumbnail(song.thumbnail)
            .setFooter(`${message.client.user.username} ~ ${status(queue)}`, message.client.user.displayAvatarURL());
        message.channel.send(embed);
    })
    .on("empty", message => {
        let thing = new MessageEmbed()
             .setColor(message.client.color)
             .setDescription(`Channel is empty. Leaving the channel`)
        message.channel.send(thing);
    })
    .on("error", (message, err) => {
        const embed = new MessageEmbed()
           .setColor(message.client.color)
           .setDescription(`An error encountered: ${err}`)
        message.channel.send(embed);
    })
    .on("finish", message => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`No more song in queue`)
        message.channel.send(embed);
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
    })
    .on("noRelated", message => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Can't find related video to play. Stop playing music.`)
        message.channel.send(embed);
    })
    .on("playList", (message, queue, playlist, song) => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Play **${playlist.title}** playlist (${playlist.total_items} songs)\nNow playing **[${song.name}](${song.url})** [${song.user}] - \`[${song.formattedDuration}]\``)
            .setThumbnail(playlist.thumbnail)
            .setFooter(`${message.client.user.username} ~ ${status(queue)}`, message.client.user.displayAvatarURL());
        message.channel.send(embed);
    })
    .on("playSong", (message, queue, song) => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Started Playing **[${song.name}](${song.url})** - [${song.user}] \`[${song.formattedDuration}]\``)
            .setThumbnail(song.thumbnail)
            .setFooter(`${message.client.user.username} ~ ${status(queue)}`, message.client.user.displayAvatarURL());
        message.channel.send(embed);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Searching canceled!`)
        message.channel.send(embed);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
            .setFooter(`Enter anything else or wait 60 seconds to cancel`);
        message.channel.send(embed);
    });



client.login(Cyan);