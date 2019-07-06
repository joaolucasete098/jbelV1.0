module.exports = (client, message, args) => {
    let serverQueue = client.queue.get(message.guild.id)
    if (!message.member.voiceChannel) return message.channel.send({
        embed: {
            description: "Você não está em um canal de voz!",
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
    if (!serverQueue) return message.channel.send({
        embed: {
            description: "Não há nada tocando",
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
    if (!args[0]) return message.channel.send({
        embed: {
            description: `O volume é: **${serverQueue.volume}**`,
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send({
        embed: {
            description: `Volume setado para: **${args[0]}**`,
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));

}