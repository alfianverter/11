const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

// START-MAIN
exports.run = async (bot, message, args) => {
  const words = [
    `${message.author.username} is hugging **${args[0]}** >////<`,
    `Look at ${message.author.username} and **${args[0]}**! O////O`,
    `How cute, ${message.author.username} is hugging **${args[0]}**!`
  ];
  // VARIABLES
  const wordAnswer = words.random(),
    answers = await neko.getSFWHug(),
    idkI = "https://tinyurl.com/MikuIDK",
    idkD = `**${message.author.username}** trying to hug themselves,\nI wonder how...`;
  let description, image;

  // STATEMENT
  !args[0] ? (description = idkD, image = idkI) : (description = wordAnswer, image = answers.url);

  // BEGIN
  const embed = new Discord.RichEmbed()
    .setAuthor("Unb -- Hug", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  message.channel.send("**Loading Image...**")
    .then(m => m.edit({
      embed
    }))
    .then(delete require.cache[require.resolve('./hug.js')])
    .catch(err => console.log(err.stack));
}; // END-MAIN

exports.conf = {
  aliases: [],
  cooldown: 5
};

exports.help = {
  name: "hug",
  category: "Fun",
  description: "Hug someone!",
  usage: "hug \`<mention user>\` or \`<name>\`",
  param: "\`<mention user>\` or \`<name>\` are optional.",
  aliases: ""
};