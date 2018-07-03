const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  let start = message.createdTimestamp; //seharusnya gak pake () :v 
        let diff = (Date.now() - start); 
        let API = (bot.ping).toFixed(2)
        let embed = new Discord.RichEmbed()
        .setTitle("🏓 Pong!")
        .addField("Latency", `${diff}ms`, true)
        .addField("API", `${API}ms`, true)
        .setColor("RED")
        .setTimestamp()
        .setFooter("Ping.js¤")
        message.channel.send(embed);
};