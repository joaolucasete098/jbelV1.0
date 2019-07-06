module.exports = (client, message) => {
    var serverQueue = client.queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send({
        embed: {
            description: "Você não está em um canal de voz!",
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
    if (!serverQueue) return message.channel.send({
        embed: {
            description: "Não há nada tocando que eu possa pular para você.",
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
    serverQueue.connection.dispatcher.end(() => {
        message.channel.send({
            embed: {
                description: "Música pulada com sucesso!",
                color: 0x00ff00
            }
        })
    }).then(msg => msg.delete(2000));
    return undefined;
}