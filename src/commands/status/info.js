'use strict'
const os = require("os");
const { version } = require('package.json')
module.exports = (client, message, args, RichEmbed) => {
    let usedMemory = (os.totalmem() - os.freemem()) / 1000000000
    const embed = new RichEmbed()
        .setAuthor('📊 Info Bot')
        .setTitle(`Fui programado em ${emojiGet(client, 'js')} para tentar te ajudar em algumas coisas.`)
        .addField('🤖 Nome ', `**\`${client.user.tag}\`[Adicionar](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)**`, true)
        .addField('🔗 Id ', `**\`${client.user.id}\`**`, true)
        .addField('⚙ Version ', `\`\`${version}\`\``, true)
        .addField(`${emojiGet(client, 'owner')} Dono `, `<@268351613771448320>`, true)
        .addField(`${emojiGet(client, 'mem')} Uso de Memória `, `\`\`\`js\n${usedMemory.toFixed(2)} GB\`\`\``, true)
        .addField(`${emojiGet(client, 'ping')} Api latência`, `\`\`\`js\n${Math.round(client.ping)} ms\`\`\``, true)
        .addField('🕑 Tempo on ', `\`\`\`js\n${convertMs(message.client.uptime)}\`\`\``)
        .addField('Host ', emojiGet(client, 'contabo'))
        .addField('Ram ', `\`\`\`css\n${(os.totalmem() / 1000000000).toFixed(2)} GB\`\`\``, true)
        .addField('SO ', `\`\`\`js\n${os.platform()}\`\`\``, true)
        .addField('Cpu ', `\`\`\`js\n${os.cpus()[0].model}\`\`\``, true)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor('#00ff00')
        .setFooter(message.author.tag, message.author.avatarURL)
    message.channel.send(embed);
}

const convertMs = ms => {
    let seconds = parseInt(ms / 1000)
    let dias = parseInt(seconds / 86400)
    seconds %= 86400
    let hours = parseInt(seconds / 3600)
    seconds %= 3600
    let minutes = parseInt(seconds / 60);
    seconds %= 60
    let text = `${dias ? dias + ' dia(s), ' : ""}${hours ? hours + ' hora(s), ' : ""}${minutes ? minutes + ' minuto(s) e ' : ""}${seconds} segundo(s)`
    return text
}

const emojiGet = (client, nome) => {
    let emoji = {
        "js": client.getEmoji('JS'),
        "owner": client.getEmoji("owner"),
        "mem": client.getEmoji("547879973214617630"),
        "ping": client.getEmoji("ping"),
        "contabo": `${client.getEmoji('con1')}${client.getEmoji('con2')}${client.getEmoji('con3')}`
    }
    return emoji[nome]
}
