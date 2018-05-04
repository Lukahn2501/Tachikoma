const {
    prefix,
} = require('../../config.json');

module.exports = {
    name: 'server',
    description: 'Get server info',
    args: true,
    usage: '<name> or <owner> or <createdAt>',
    execute(message, args) {
        if (args[1]) {
            let reply = `Too much arguments, ${message.author}!`;
            if (this.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${this.name} ${this.usage}\``;
            }
            message.channel.send(reply);
        } else {
            switch (args[0]) {
                case 'name':
                    message.channel.send(message.guild.name);
                    break;
                case 'owner':
                    message.channel.send(message.guild.owner.user.tag);
                    break;
                case 'createdAt':
                    message.channel.send(message.guild.createdAt.toString());
                    break;
                default:
                    {
                        let reply = `Argument invalid, ${message.author}!`;
                        if (this.usage) {
                            reply += `\nThe proper usage would be: \`${prefix}${this.name} ${this.usage}\``;
                        }
                        message.channel.send(reply);
                    }
            }
        }


    },
};