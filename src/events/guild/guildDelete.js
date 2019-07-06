'use strict'
const { RichEmbed } = require('discord.js')
module.exports = async (client, guild) => {
    const embedAdd = new RichEmbed()
        .setTitle(`${client.getEmoji('hypesquad_bravery')} | Bot Expulso`)
        .addField(`${client.getEmoji('server')}Servidor`, `\`\`\`css\n${guild.name}\`\`\``, true)
        .addField(`${client.getEmoji('id')}ID`, `\`\`\`css\n${guild.id}\`\`\``, true)
        .addField(`${client.getEmoji('data')}Data`, `**${client.getData()}**`, true)
        .addField(`${client.getEmoji("owner")}Owner`, guild.owner, true)
        .setThumbnail(guild.iconURL)
        .setFooter(client.owner().user.tag, client.owner().user.avatarURL)
        .setColor('RED')
        .setTimestamp()
    await client.owner().send(embedAdd)
}