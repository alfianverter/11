const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
let embedarg = args.slice(1).join(' ')
        message.delete();
let embed = new Discord.RichEmbed()
  
            .setDescription(`${embedarg}`)
            .setColor('RANDOM')

            message.channel.send({embed})
  
}