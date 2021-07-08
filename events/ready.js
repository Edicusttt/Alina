const { MessageEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = async (client, message) => {

    //If the bot is ready it sends a message in the console
    console.log(`${client.user.username} online!`);
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
    
    //Game
    let statuses = [`${client.prefix}play | ${client.prefix}help`, `Prefix : ${client.prefix}`];
    setInterval(function() {
        let status = statuses[Math.floor(Math.random()*statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});
    }, 10000)

}
