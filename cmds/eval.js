const Discord = require("discord.js"); 

exports.run = async (bot, message, args, prefix) => {    
  if (message.author.id !== '426712723108134923' && message.author.id !== '303011486916411392') return;    
  
  try {         
    let codein = args.join(" ");        
    let code = eval(codein);         
    if (typeof code !== 'string')            
      code = require('util').inspect(code, { depth: 0 });      
    let embed = new Discord.RichEmbed()       
    .setAuthor('Evaluate')      
    .setColor("RANDOM")        
    .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)      
    .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)       
    message.channel.send(embed)    
  } catch(e) {         
    message.channel.send(`\`\`\`js\n${e}\n\`\`\``);    
  } 
}