const Discord = require('discord.js')
exports.run = async (client, msg, args) => {
let user = msg.mentions.users.first();
    let author = msg.author;
    
    user = user ? user : author;
    let uEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setImage(user.displayAvatarURL)
    .setDescription(`[${msg.author} Avatar](${user.displayAvatarURL})`);

    msg.channel.send(uEmbed);
    
}