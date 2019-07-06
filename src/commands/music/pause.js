module.exports = (client, message) => {
    var serverQueue = client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send({
            embed: {
                description: '⏸ A música foi pausada',
                color: 0x00ff00
            }
        }).then(msg => msg.delete(2000));
    }
    return message.channel.send({
        embed: {
            description: "Não há nada tocando.",
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
    
}