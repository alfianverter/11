const Discord = require("discord.js"); 

exports.run = async (bot, message, args) => { 
  var yuhuu = args[0]; var prefixtarget = args[1] 
  var peminta = message.author; bot.fetchUser(yuhuu).then(wah => { 
    let botembed = new Discord.RichEmbed() 
    .setTitle(wah.tag) 
    .setDescription(`DONE !  \n\n[**BOT INVITES LINK**](https://discordapp.com/oauth2/authorize?client_id=${yuhuu}&scope=bot&permissions=0)`) 
    .addField("Name Bots: ", `${wah.username}`, true) 
    .addField("Prefix Bots : ",`${prefixtarget}`, true) 
    .setColor("RANDOM") 
    .setFooter("Inviteb Command | Link |") 
    .setThumbnail(`${wah.avatarURL}`) 
    .setAuthor(`${wah.username}`, "", `${wah.avatarURL}`) // Di Cmd Bot info bossq
    .setTimestamp()
    .addBlankField()
    message.channel.send(botembed); }) // Kina ?
}