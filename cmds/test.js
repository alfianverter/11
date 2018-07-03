const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
  let kontol = new Discord.RichEmbed()
  .setTitle("Testing")
  .setAuthor("Hello I am UnB ~_~")
  .addField("User", message.users.size)
  .addField("Server", message.guild.size)
  message.author(kontol)
  message.reply("Message Test Has sending your DM!")
}