const Discord = require("discord.js")
  exports.run = async (bot, message, args) => {
const moment = require('moment');
    const _fs = require("fs");
    const packages = JSON.parse(_fs.readFileSync('./package.json', 'utf-8'));
    require('moment-duration-format');
    const os = require('os'); 
    let cpu = os.cpus();
		
      const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const servers = bot.guilds.size
      const client_channel = bot.guilds.reduce((a, b) => a + b.channels.size, 0).toLocaleString()

      const owner = packages.author
      const idowner = packages.idauthor

      const ccpu = process.cpuUsage().system / 1024 / 1024;

      const users = bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
      const nodever = process.version
      const memory_on_bot = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)

        const statembed = new Discord.RichEmbed()
        .setColor(0xff2f2f)
        .setDescription("📊 UnB Bot Stats")
        .setFooter(`Miyuki | ${packages.version}`)
        .setTimestamp()

        .addField("Bot Uptime:", `• ${duration}`, true)
        .addField("Memory Usage:", `• ${memory_on_bot} MB`, true)
        .addField("Advanced Stats:", `• ${servers} Servers \n• ${users} Users \n• ${client_channel} Channels`, true)
        .addField("Bot Informations:", `• Bot Developer: ${owner} \n• Bot Version: ${packages.version}`, true)
        .addField("CPU Usage:", `• ${Math.round(ccpu * 100) / 100}%`, true)
        message.channel.send(statembed);
  }