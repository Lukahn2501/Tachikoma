module.exports = {
    name: 'serverinfo',
    description: 'Get server info',
    execute(message, args) {
        message.channel.send(message.guild.name+"\n"+message.guild.owner+"\n"+message.guild.createdAt);
    },
};