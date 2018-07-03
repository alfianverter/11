const Discord = require('discord.js');
const { prefixs, GOOGLE_API_KEY } = require('./config.js');
//const config = require('./config.json');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const DBL = require("dblapi.js");
const fs = require("fs");
const nodegyp = require('node-gyp')
const nodeopus = require('node-opus')
const chalk = require('chalk')
const canvas = require('canvas')
const dognames = require('dog-names')
const memejs = require('memejs');
const enmap = require('enmap');
var enmaplvl =  require('enmap-level');
const prefix = 'un#';
const bot = new Discord.Client();
const client = new Discord.Client();

const serverStats = {
  guildID: '458430756989960222',
  totalUsersID: '459307165069606942',
  memberCountID: '459307164373221376',
  botCountID: '459307165652484106'
};
//if (msg == `<@${client.user.id}>` || msg == `<@!$client.user.id}>`) {
       // msg.reply(`My prefix is ${prefix}`);
//};

// if (com == `<@${client.user.id}>` || msg == `<@!$client.user.id}>`)  {
   //message.reply(`My Prefix is ${prefix}`);
 
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0NTAzNTA5Mzg5NTkzODA1MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTI2MzI3NzUwfQ.IHGZg-gblWfvwjXGLRsdl-tunT9QqJ2LsondMan4-MU', client);

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on("ready", () => {
    function randomStatus() {
        let status = [`${client.guilds.size} guilds.`, `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users.`, "un#help | Beta", "Music with my users."]
          let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus], {type: 'LISTENING'});
	}; setInterval(randomStatus, 30000)
	setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 1800000);
    console.log("Bot berhasil dinyalakan.");
});

client.on("guildCreate", guild => {
  console.log(`Invited bot to: ${guild.name}, owned by ${guild.owner.user.username}!`)
});

client.on("guildDelete", guild => {
  console.log(`Kicked from: ${guild.name}. RIP.`)
});

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefixs)) return undefined;

    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);

    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(prefix.length)
//	  command = command.slice(prefix.length)
// Commands
       if (command === 'changelog') {
	        let embed = new Discord.RichEmbed()
		.setTitle("UnB Changelog | 27 May 2018")
		.setDescription("**[+] Added | [-] Removed | [*] Changed/Fixed** \n\n**[+]** Commands: `sayd` \n**[*]** Commands: `say` `sayembed`\n\n **[-]** Commands: `kiss` `pat`")
		.setFooter("UnB | Beta")
		.setColor('GREEN')
		.setTimestamp()
		
		return msg.channel.send(embed)
		};
       if (command === 'help') {
                let helpembed = new Discord.RichEmbed()
		.setThumbnail('https://cdn.discordapp.com/avatars/452673718699950090/52a0092ff7411b4a5149487c25e15e1e.png?size=2048')
                .setTitle("Hi, UnB :-)")
		.setDescription("Below you can see all command that I can run.\nHelp command with new design! `un#helpbeta`")
                .addField("**CORE**", "`help` `helpbeta` `ping` `invite` `stats` `info` `changelog`")
		.addField("**MUSIC**", "`play` `skip` `stop` `queue` `pause` `resume` `volume` `np`") 
		.addField("**UTILITY**", "`userinfo` `serverinfo` `avatar` `weather` `discrim`")
		.addField("**FUN**", "`8ball` `say` `sayd` `sayembed` `cleverbot` `randommeme`")
		.addField("**Usefull Links**", "[Vote Me](https://discordbots.org/bot/445035093895938053/vote) | [Invite Me](https://discordbots.org/bot/445035093895938053) | [Support Server](https://discord.gg/pU8JMyJ) | [Donate Me](https://www.patreon.com/MiyukiBot)")
		.setFooter("Unb Bot")
		.setColor('GREEN')
                .setTimestamp()

                return msg.author.send(helpembed)
       msg.reply("iam Sending your Dm's")
       };
	if (command === 'weather') {
    const weather = require('weather-js');
    const city = msg.content.split(" ").slice(1).join(" ")
    if (!city) return msg.channel.send("**Error**\nYou did not include a city! Please include it so we can show the forecast!")

    weather.find({search: city, degreeType: 'C'}, function(err, result) {
        if (err) {
            msg.channel.send(":x: No results on that city :x:")
            console.log(err.stack)
            return;
        } 
        let url;
        if (result[0].current.skytext === "Mostly Sunny") url = "https://openclipart.org/image/2400px/svg_to_png/3367/ivak-Decorative-Sun.png"
        else if (result[0].current.skytext === "Mostly Cloudy" || result[0].current.skytext === "Cloudy") url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Weather-heavy-overcast.svg/200px-Weather-heavy-overcast.svg.png"
        else if (result[0].current.skytext === "Partly Cloudy") url = "";
        var embed = new Discord.RichEmbed()
        .setTitle(`Forecast for ${result[0].location.name}`)
        .setColor("BLUE")
        .setThumbnail(result[0].current.imageUrl)
        .setTimestamp()
        .addField(":thermometer: Temperature :thermometer:", `**__${result[0].current.temperature}__ Degrees Celsius**`, true)
        .addField(":city_sunset: What it looks like outside :city_sunset:", `**__${result[0].current.skytext}__**`, true)
        .addField(":wind_blowing_face: Feels Like :wind_blowing_face:", `**__${result[0].current.feelslike}__ Degrees Celsius**`, true)
        .addField(":sweat: Humidity :sweat:", `**__${result[0].current.humidity}%__**`, true)
        .addField(":wind_blowing_face: Wind Speed :wind_blowing_face:", `**__${result[0].current.windspeed.replace("mph", "Miles Per Hour")}__**`, true)
        .setFooter("unb Bot")
        msg.channel.send({ embed: embed })
})};
	if (command === '8ball') {
		var tanyas = [':8ball: Absolutely.', ':8ball: Absolutely not.', ':8ball: It is true.', ':8ball: Impossible.', ':8ball: Of course.', ':8ball: I do not think so.', ':8ball: It is true.', ':8ball: It is not true.', ':8ball: I am very undoubtful of that.',':8ball: I am very doubtful of that.', ':8ball: Sources point to no.', ':8ball: Theories prove it.', ':8ball: Reply hazy try again', ':8ball: Ask again later', ':8ball: Better not tell you now', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again'];
        const embed = new Discord.RichEmbed()
        .setDescription(tanyas[Math.floor(Math.random() * tanyas.length)])
        .setColor(0xff2f2f)

        msg.channel.send({embed});
}
	if (command === 'say') {
		        let embedarg = args.slice(1).join(' ')

            msg.channel.send(`${embedarg}`)
  msg.channel.send("embedarg") 
}
if (command === 'sayd') {
	
	          if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
            return msg.reply("No **Manage Messages** permissions. We can't do that.")
        }
	
        let embedarg = args.slice(1).join(' ')
        msg.delete()

            msg.channel.send(`${embedarg}`)
  msg.author.send("Kamu Telah Menggunakan Command **sayd**")
}
if (command === 'sayembed') {
	        let embedarg = args.slice(1).join(' ')
        msg.delete();
let embed = new Discord.RichEmbed()
  
            .setDescription(`${embedarg}`)
            .setColor('RANDOM')

            msg.channel.send({embed})
  
}
if (command === 'ping') {
        let start = msg.createdTimestamp; //seharusnya gak pake () :v 
        let diff = (Date.now() - start); 
        let API = (client.ping).toFixed(2)
        let embed = new Discord.RichEmbed()
     .setTimestamp()
        .setFooter("Ping-Pong")
        .setTitle("🏓 Pong!")
        .addField("Latency", `${diff}ms`, true)
        .addField("API", `${API}ms`, true)
     
      msg.channel.send(embed);
};
	if (command === 'invitemiyuki') {
		let inviteembed = new Discord.RichEmbed()
		
		.addField("Invite Miyuki", "[The Link](https://discordapp.com/api/oauth2/authorize?client_id=445035093895938053&permissions=66579520&scope=bot)")
                .setFooter("Miyuki Bot")
		
		return msg.channel.send(inviteembed)
	};
	if (command === 'stats') {
	const Discord = require("discord.js")
    const moment = require('moment');
    const _fs = require("fs");
    const packages = JSON.parse(_fs.readFileSync('./package.json', 'utf-8'));
    require('moment-duration-format');
    const os = require('os'); 
    let cpu = os.cpus();
		
      const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const servers = client.guilds.size
      const client_channel = client.guilds.reduce((a, b) => a + b.channels.size, 0).toLocaleString()

      const owner = packages.author
      const idowner = packages.idauthor

      const ccpu = process.cpuUsage().system / 1024 / 1024;

      const users = client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
      const nodever = process.version
      const memory_on_bot = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)

        const statembed = new Discord.RichEmbed()
        .setColor(0xff2f2f)
        .setDescription("📊 UNB Bot Stats")
        .setFooter(`Unknown Stats | ${packages.version}`)
        .setTimestamp()
        .addField("Name", `Unknown Bot`)
        .addField("Joined Server",`• ${bot.guilds.size} Guild`)
        .addField("Joined Channel", `• ${bot.channels.size} Channels`)
        .addField("My Friend", `• ${bot.users.size} User`)
        .addField("Bot Uptime:", `• ${duration}`, true)
        .addField("Memory Usage:", `• ${memory_on_bot} MB`, true)
        .addField("Advanced Stats:", `• ${servers} Servers \n• ${users} Users \n• ${client_channel} Channels`, true)
        .addField("Bot Informations:", `• Bot Developer: ${owner} \n• Bot Version: ${packages.version}`, true)
        .addField("CPU Usage:", `• ${Math.round(ccpu * 100) / 100}%`, true)
	.addField("Usefull Links", "[Vote Me](https://discordbots.org/bot/445035093895938053/vote) | [Invite Me](https://discordbots.org/bot/445035093895938053) | [Support Server](https://discord.gg/pU8JMyJ)")

        msg.channel.send(statembed);	
	};
if (command === 'hookcreate') {
  
exports.run = async (client, message, args) => {
  const hookembed = new Discord.RichEmbed()
  if (!message.member.hasPermission("MANAGE_WEBHOOKS,")) {
        message.channel.send(`${message.author}, Kamu tidak memiliki akses "``MANAGE_WEBHOOKS``"`)
    }
    const nameAvatar = args.join(" ");
    const linkCheck = /https?:\/\/.+\.(?:png|jpg|jpeg)/gi;
    if (!linkCheck.test(nameAvatar)) return message.reply("You must supply an image link.");
    const avatar = nameAvatar.match(linkCheck)[0];
    const name = nameAvatar.replace(linkCheck, "");
    message.channel.createWebhook(name, avatar)
        .then(webhook => webhook.edit(name, avatar)
            .catch(error => console.log(error)))
        .then(wb => message.author.send(`Here is your webhook https://ptb.discordapp.com/api/webhooks/${wb.id}/${wb.token}\n\nMOHON JAGA INI DENGAN BAIK, KAYAK JAGA PACAR KAMU DARI PELAKORRRRRRR!!!!.`)
            .catch(error => console.log(error)))
        .catch(error => console.log(error));
}
  
  
  
};
  if (command === 'cls') {
    if (!msg.member.hasPermission("MANAGE_MESSAGES"))
        return msg.channel.send('you not have permission') 
    const user = msg.mentions.users.first();
    const amount = !!parseInt(msg.content.split(' ')[1]) ? parseInt(msg.content.split(' ')[1]) : parseInt(msg.content.split(' ')[2])
    if (!amount) return msg.reply('Haw Mach should is it ?');
    if (!amount && !user) return msg.reply('Haw Mach should is it ? and Who ?');
    msg.channel.fetchMessages({
            limit: amount,
        }).then((messages) => {
                if (user) {
                const filterBy = user ? user.id : client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
            }
        msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        });
}
  
  
  
  

  if (command === 'eval') {
    if (msg.author.id !== '304377187057008645') return;
    try {
        let codein = args.slice(1).join(' ');
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        msg.channel.send(embed)
    } catch(e) {
        msg.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
};
	
  if (command === 'avatar') {
    let user = msg.mentions.users.first();
    let author = msg.author;
    
    user = user ? user : author;
    let uEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setImage(user.displayAvatarURL)
    .setDescription(`[${msg.author} Avatar](${user.displayAvatarURL})`);
    
    msg.channel.send(uEmbed);
    
};
	if (command ==='serverinfo') {
    let sicon       = msg.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
        .setDescription("**Server Information**")
        .setColor("#610768")
        .setThumbnail(sicon)
        .addField("Server Name", msg.guild.name)
        .addField("Created At", msg.guild.createdAt)
        .addField("You joined At", msg.guild.joinedAt)
        .addField("Server Owner", msg.guild.owner)
        .addField("Total Members", msg.guild.memberCount)
    .addField(" Member Stats online:", msg.guild.members.filter(m => m.presence.status === 'online').size)
 .addField(" Member Stats Idle:", msg.guild.members.filter(m => m.presence.status === 'idle').size)
 .addField(" Member Stats Dnd:", msg.guild.members.filter(m => m.presence.status === 'dnd').size)
.addField(" Member Stats Offline:", msg.guild.members.filter(m => m.presence.status === 'offline').size)

    msg.channel.send(serverEmbed);
};
	if (command === 'userinfo') {
    let user = msg.mentions.users.first();
    let author = msg.author;

    let status = {
        online: "<:435163118591672343:> Online",
        idle: "< :435163118692335616:> Idle",
        dnd: "<:435163118444871691:> Do Not Disturb",
        offline: "<:435163118750924830:> Offline"
    }
    
    user = user ? user : author;
    let uEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Info`, user.displayAvatarURL)
    .setThumbnail(user.displayAvatarURL)
    .setColor("RANDOM")
    .addField("ID", user.id, true)
    .addField("Username", user.username, true)
    .addField("Status", status[user.presence.status], true)
    .addField("Bot ?", user.bot ? `Yup \:robot\:` : `Nope`, true);

    msg.channel.send(uEmbed);
    
}
	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
                                        let selectembed = new Discord.RichEmbed()
					.setColor("RANDOM")
					.setTitle("Song Selection")
					.setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
					.setFooter("Please provide a value to select one of the search results ranging from 1-10.")
					
					msg.channel.send(selectembed)
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		let embed = new Discord.RichEmbed()
    serverQueue.connection.dispatcher.end('Skip command has been used!');
	msg.channel.send("**Music Has been skipped for you !**")
  // msg.channel.send(embed)
    return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		msg.channel.send("**Music has been stopped !**")
    return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	
  } else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		let nowembed = new Discord.RichEmbed()
		
		.setDescription(`🎶 Now playing: **${serverQueue.songs[0].title}**`)
		
		return msg.channel.send(nowembed);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		let queueembed = new Discord.RichEmbed()
		
		.setTitle("Song Queue")
		.setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
		.addField("Now Playing", `${serverQueue.songs[0].title}`)
		
		return msg.channel.send(queueembed)
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Discord.Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 50,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		let qaddembed = new Discord.RichEmbed()
		
  .setColor("RANDOM")
  .setAuthor(`Added to Queue`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Title', `__[${song.title}](${song.url})__`, true)
  .addField('Video ID', `${song.id}`, true)
  .addField("Duration", `${song.durationm}min ${song.durations}sec`, true)
  .setTimestamp();
		
	        return msg.channel.send(qaddembed);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 50);

	
	let splayembed = new Discord.RichEmbed()
	
  .setColor("RANDOM")
  .setAuthor(`Start Playing`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('Title', `__[${song.title}](${song.url})__`, true)
  .addField('Video ID', `${song.id}`, true)
  .addField("Duration", `${song.durationm}min ${song.durations}sec`, true)
  .addField("Volume", `${serverQueue.volume}%`, true)
  .setFooter("If you can't hear the music, please reconect. If you still don't hear it, maybe the bot is restarting!")
  .setTimestamp();
	
	return serverQueue.textChannel.send(splayembed);
}
// Listener Events
client.on('message', message => { // This will run every time a message is recieved, sending it the message object.
 
  // Variables
  let msg = message.content.toUpperCase(); // This takes the message.content, and turns it all uppercase.
  let sender = message.author; // This variable holds the message's author.
  let args = message.content.slice(prefix.length).trim().split(' '); // This variable takes the message.content, slices off the prefix from the front, then trims the blank spaces on the side, and turns it into an array by separating it by spaces.
  let cmd = args.shift().toLowerCase(); // This variable holds the first item from the args array, which is taken off of the args array and turned into lowercase.
 
  // Return Statements
  if (!msg.startsWith(prefix)) return; // If the message doesn't start with the prefix, exit the code.
  if (message.author.bot) return; // If the message's author is a bot, exit the code.
    if (message.channel.type === 'dm') return
  
 
  // Command Handler
  try { // This will run first, it will 'try' to run this code
   
    let commandFile = require(`./cmds/${cmd}.js`); // This will create a requirement of the given file.
    commandFile.run(client, message, args, prefix); // This will attempt to run the file you just fetched. Now, we can add it to things to pass when running commands, so this means the functions.js file will automatically be added to the commands.
   commandFile.run(bot, message, args, prefixs);
  } catch (e) { // This will run if it encounters an error, such as the command not being found.
    console.log(e.msg)
  } finally {
    console.log('sudah') 
  } 
    
    client.on('guildMemberAdd', member => {

if (member.guild.id !== serverStats.guildID) return;

client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);

client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);

client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

});


client.on('guildMemberRemove', member => {

if (member.guild.id !== serverStats.guildID) return;

client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);

client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);

client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

})

          

          
  });

client.login(process.env.TOKEN)