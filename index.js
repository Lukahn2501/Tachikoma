// require modules
const Discord = require('discord.js');
const {
    prefix,
    token,
} = require('./config.json');
const fs = require('fs');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// handle commands init
// TODO: udprade command init, make it search from ./commands recursively
const serverFiles = fs.readdirSync('./commands/serverinfo/');
for (const file of serverFiles) {
    console.log(file);
    const command = require(`./commands/serverinfo/${file}`);
    client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will trigger whenever the bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});


// client message handlers
client.on('message', message => {
    console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// login to Discord with the app's token
client.login(token);

// open documentation
window.open('https://lukahn2501.github.io/Tachikoma/#/', '_self');