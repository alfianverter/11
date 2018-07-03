const Discord = require('discord.js');
const client = new Discord.Client();
const eventReq = (event) => require(`../events/${event}`);
module.exports = bot => {
  client.on('ready', () => eventReq('ready')(bot));
  client.on('message', eventReq('message'));
};