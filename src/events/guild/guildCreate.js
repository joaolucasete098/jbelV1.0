'use strict'
const { RichEmbed } = require('discord.js')
// eslint-disable-next-line no-undef
const newGuild = getmodule('controllers/newGuild')
module.exports = async (client, guild) => {
    newGuild.run(client, guild.id)
    const embedAdd = new RichEmbed()
        .setTitle(`${client.getEmoji('hypesquad_bravery')} | Bot Adicionado`)
        .addField(`${client.getEmoji('server')}Servidor`, `\`\`\`css\n${guild.name}\`\`\``, true)
        .addField(`${client.getEmoji('id')}ID`, `\`\`\`css\n${guild.id}\`\`\``, true)
        .addField(`${client.getEmoji('data')}Data`, `**${client.getData()}**`, true)
        .addField(`${client.getEmoji("owner")}Owner`, guild.owner, true)
        .setThumbnail(guild.iconURL)
        .setFooter(client.owner().user.tag, client.owner().user.avatarURL)
        .setColor('BLUE')
        .setTimestamp()
    await client.owner().send(embedAdd)
}