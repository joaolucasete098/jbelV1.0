module.exports = (client, message) => {
    var serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('Não há nada tocando');
    return message.channel.send({
        embed: {
            description: `🎶 Tocando agora: **${serverQueue.songs[0].title}**`,
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
}