const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
let sicon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
        .setDescription("**Server Information**")
        .setColor("#610768")
        .setThumbnail(sicon)
       .setFooter("•ServerInfo")
    .setTimestamp()
    .addField("Server Name", message.guild.name)
       .addField("ID Server", message.guild.id)
       .addField("Region", message.guild.region)
       .addField("Created At", message.guild.createdAt)
    .addField("You joined At", message.guild.joinedAt)
        .addField("Server Owner", message.guild.owner)
        .addField("Total Members", message.guild.memberCount);
        
    message.channel.send(serverEmbed);
}