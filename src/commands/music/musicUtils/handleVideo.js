/* eslint-disable no-console */
const play = require('./playVideo')
module.exports = async (client, video, message, voiceChannel, playlist = false) => {
    var serverQueue = client.queue.get(message.guild.id);
    var song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        durationh: video.duration.hours,
        durationm: video.duration.minutes,
        durations: video.duration.seconds,
    };
    if (!serverQueue) {
        var queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 2,
            playing: true
        };
        client.queue.set(message.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            voiceChannel.join().then(connection => {
                queueConstruct.connection = connection;
                play(client, message.guild, queueConstruct.songs[0]);
            })
        } catch (error) {
            console.error(`Eu não pude entrar no canal de voz: ${error}`);
            client.queue.delete(message.guild.id);
            return message.channel.send({
                embed: {
                    description: "Eu não pude entrar no canal de voz",
                    color: 0x00ff00
                }
            }).then(msg => msg.delete(2000));
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return undefined;
        return message.channel.send({
            embed: {
                description: `✅ | **${song.title}** adicionado à fila`,
                color: 0x00ff00
            }
        }).then(msg => msg.delete(2000));
    }

}