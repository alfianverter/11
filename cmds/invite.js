const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
  .addField("Invite Bot To your Server!", `[**Click Here!**](${`https://discordapp.com/oauth2/authorize?client_id=451250598680199169&scope=bot`})`, true)
  .setFooter("Invite Links !")
  .setColor("RANDOM")
  .addField("Support Server:", "https://discord.gg/WVFXQ")
  .addField("Thanks For Invite Me","😊")
  message.channel.send(embed)
  
}