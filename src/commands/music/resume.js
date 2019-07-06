module.exports = (client, message) => {
    var serverQueue = client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send({
            embed: {
                description: "▶ Música retomada para você!",
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