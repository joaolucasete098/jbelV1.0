module.exports = (client, message, args, RichEmbed) => {
    var serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send({
        embed: {
            description: "Não há nada tocando",
            color: 0x00ff00
        }
    }).then(msg => msg.delete(2000));
    const embedQueue = new RichEmbed()
        .setTitle("Música(s) na fila")
        .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
        .setTimestamp()
        .setColor("#4169E1")
        .setFooter(message.author.tag, message.author.avatarURL)
    return message.channel.send(embedQueue).then(msg => msg.delete(10000));
}