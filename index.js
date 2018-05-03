// require the discord.js module
const Discord = require('discord.js');

//require config
const {
    prefix,
    token
} = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever the bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});


//client handlers
client.on('message', message => {
    console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    console.log(args);
    const command = args.shift().toLowerCase();
    //get args infos
    if (command === 'whoami') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
        message.channel.send(message.author.displayAvatarURL);
    } else if (command === 'delete') {
        try {
            message.channel.fetchMessages().then(
                (res) => {
                    res.forEach(mes => {
                        console.log(mes.content);
                        mes.delete();
                    });
                }, (error) => {
                    console.log("nope nope nope " + error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

});

// login to Discord with the app's token
client.login(token);