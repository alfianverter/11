const chalk = require('chalk');
module.exports = client => {
  console.log(chalk.bgGreen.white(`Logged in as ${client.user.tag}!`));
  client.user.setStatus("idle");
  client.user.setActivity('in your room!');
};