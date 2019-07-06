/* eslint-disable no-console */
const Discord = require('discord.js')

const YouTube = require('simple-youtube-api');
const { keyApi } = require('config.json')
const youtube = new YouTube(keyApi);
const handleVideo = require('./musicUtils/handleVideo')
module.exports = async (client, message, args) => {
    var videos
    var searchString = args.join(' ');
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send({
        embed: {
            description: "Me desculpe, mas você precisa estar em um canal de voz para tocar música!",
            color: 0x00ff00
        }
    })
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
        return message.channel.send({
            embed: {
                description: "Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!",
                color: 0x00ff00
            }
        });
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send({
            embed: {
                description: "Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!",
                color: 0x00ff00
            }
        });
    }
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        var playlist = await youtube.getPlaylist(url);
        videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
            await handleVideo(client, video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
        return message.channel.send({
            embed: {
                description: `✅ Playlist: **${playlist.title}** adicionada à fila!`,
                color: 0x00ff00
            }
        });
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                videos = await youtube.searchVideos(searchString, 10);
                var index = 0;
                const embedTocar = new Discord.RichEmbed()
                    .setTitle("Selecione a música desejada:")
                    .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
                    .setTimestamp()
                    .setColor("#4169E1")
                    .setFooter("Insira valores de 1 à 10", message.author.avatarURL)
                message.channel.send(embedTocar).then(msg => msg.delete(10000))
                // eslint-disable-next-line max-depth
                try {
                    var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    return message.channel.send({
                        embed: {
                            description: "Valor inválido ou nenhum valor inserido, cancelando a seleção de vídeo.",
                            color: 0x00ff00
                        }
                    }).then(msg => msg.delete(2000));
                }
                var videoIndex = parseInt(response.first().content);
                video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                return message.channel.send({
                    embed: {
                        description: "🆘 Não consegui obter nenhum resultado de pesquisa.",
                        color: 0x00ff00
                    }
                }).then(msg => msg.delete(2000));
            }
        }
    }
    return handleVideo(client, video, message, voiceChannel)
}