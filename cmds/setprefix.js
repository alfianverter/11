const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, color) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Sorry you don't have the permission to change prefix!");
    if (!args[0] || args[0] == "help") return message.reply(`usage: my!setprefix <new prefix>`);
    
    let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });

    let embed = new Discord.RichEmbed()
    .setTitle("Prefix set!")
    .setTimestamp()
    .setDescription(`Set to **${args[0]}** in this server`);

    message.channel.send(embed);
}

exports.help = {
    name: "prefix",
    description: "Change your server prefix",
    usage: "un#setprefix <new prefix>"
}