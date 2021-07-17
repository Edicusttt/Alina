// load env file (contains important keys)
require('dotenv').config();
const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const DisTube = require('distube');
const Client = require(`${process.cwd()}/struct/Alina`);
const config = require(`${process.cwd()}/config`);

const client = new Client(config);

require("discord-buttons")(client);
const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);
client.distube = new DisTube(client, {
    youtubeCookie: process.env.COOKIE,
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

// DisTube Event

const { color } = client.config;
  
client.distube
    .on("addList", (message, queue, playlist) => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Added **${playlist.title}** playlist (${playlist.total_items} songs) to the queue - [${song.user}]`)
            .setThumbnail(playlist.thumbnail)
            .setFooter(`Request by: ${message.author.tag}`, message.client.user.displayAvatarURL());
        message.channel.send(embed);
    })
    .on("addSong", (message, queue, song) => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Added **[${song.name}](${song.url})** - [${song.user}] \`[${song.formattedDuration}]\` to the queue`)
            .setThumbnail(song.thumbnail)
            .setFooter(`Music | \©️${new Date().getFullYear()} Alina`);
        message.channel.send(embed);
    })
    .on("empty", message => {
        let thing = new MessageEmbed()
             .setColor(color)
             .setDescription(`Channel is empty. Leaving the channel`)
        message.channel.send(thing);
    })
    .on("error", (message, err) => {
        const embed = new MessageEmbed()
           .setColor(color)
           .setDescription(`An error encountered: ${err}`)
        message.channel.send(embed);
    })
    .on("finish", message => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`No more song in queue`)
        message.channel.send(embed);
    })
    .on("initQueue", queue => {
        queue.autoplay = false;
    })
    .on("noRelated", message => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Can't find related video to play. Stop playing music.`)
        message.channel.send(embed);
    })
    .on("playList", (message, queue, playlist, song) => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Play **${playlist.title}** playlist (${playlist.total_items} songs)\nNow playing **[${song.name}](${song.url})** [${song.user}] - \`[${song.formattedDuration}]\``)
            .setThumbnail(playlist.thumbnail)
            .setFooter(`Music | \©️${new Date().getFullYear()} Alina`);
        message.channel.send(embed);
    })
    .on("playSong", (message, queue, song) => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Started Playing **[${song.name}](${song.url})** - [${song.user}] \`[${song.formattedDuration}]\``)
            .setThumbnail(song.thumbnail)
            .setFooter(`Music | \©️${new Date().getFullYear()} Alina`);
        message.channel.send(embed);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Searching canceled!`)
        message.channel.send(embed);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        const embed = new MessageEmbed()
            .setColor(color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
            .setFooter(`Enter anything else or wait 60 seconds to cancel`);
        message.channel.send(embed);
    });

const options = {
  bypass: true,
  log: true,
  paths: [
    'Action', 'Anime', 'Info',
    'General', 'Fun', 'Moderation', 'Music',
    'Owner', 'Setup', 'Social','Utility'
  ]
}; 

client.database.init();


client.loadCommands({ parent: 'commands', ...options });

client.loadEvents({ parent: 'events', ...options });

client.defineCollections([ 'discovery', 'economy', 'memes', 'xp' ]);

client.listentoProcessEvents([
  'unhandledRejection',
  'uncaughtException'
], { ignore: false });

client.login();
