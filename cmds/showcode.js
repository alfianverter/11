const Discord = require('discord.js');
exports.run = (bot, message, args) => {
  const embed = new Discord.RichEmbed()
    .setColor(0x1a9ca8)
    .setImage("https://behapy.s3.amazonaws.com/40/32/504032/default.jpg");
  message.channel.send({
    embed
  });
};
exports.conf = {
  aliases: ["code"],
  cooldown: 3
};

exports.help = {
  name: "showcode",
  category: "Misc.",
  description: "",
  usage: "showcode",
  param: "",
  aliases: "code"
};