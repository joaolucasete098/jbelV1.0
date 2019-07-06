/* eslint-disable no-console */
const fetchVideoInfo = require('youtube-info'),
    Discord = require('discord.js'),
    ytdl = require('ytdl-core'),
    moment = require('moment')
module.exports = (client, guild, song) => {
    var serverQueue = client.queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        client.queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Música terminada');
            else console.log(reason);
            serverQueue.songs.shift();
            setTimeout(() => {
                client.commands.playVideo(client, guild, serverQueue.songs[0]);
            }, 250);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    fetchVideoInfo(`${song.id}`).then(function (v) {
        const embedInf = new Discord.RichEmbed()
            .setDescription(`🎤 [${v.title}](${v.url})`)
            .addField('⏰ Duração', `${song.durationh ? `${song.durationh < 10 ? '0' + song.durationh : song.durationh}` : ""}${song.durationm < 10 ? '0' + song.durationm : song.durationm}:${song.durations < 10 ? '0' + song.durations : song.durations}`, true)
            .addField('👀 Visualizações:', Number(v.views).toLocaleString(), true)
            .addField('🤠 Publicado', moment(v.datePublished).format('ll'), true)
            .setThumbnail(v.thumbnailUrl)
            .setTimestamp()
            .setColor(0x4959e9);

        return serverQueue.textChannel.send(embedInf);
    })
}