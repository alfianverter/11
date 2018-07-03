const Discord = require('discord.js'); 
const catname = require('cat-names'); 
exports.run = (bot, message, args) => { 
  const name = catname.random(); 
  const emoji = ["OwO", "( 0w0)-b", "ðŸ˜�", "ðŸ˜Œ", "ðŸ˜³", "ðŸ�±", "ðŸ˜†", "ðŸ‘Œ", "ðŸ˜™"].random(); 
  const embed = new Discord.RichEmbed() 
  .setAuthor("BETA -- Cat Names") 
  .setColor(0x1a9ca8) 
  .setDescription(`If you were my dog, I\'d name you **${name}**!${emoji}`) 
  .setFooter("cat-names (npm)"); 
  message.channel.send({ embed }); }; 
exports.conf = { aliases: ["catname"], 
                cooldown: 5 }; 
exports.help = { 
  name: "catnames", 
  category: "Fun", 
  description: "What\'s your name if you were born as a cat!? \`OwO\`", 
  usage: "catnames", 
  param: "", 
  aliases: "catname" };