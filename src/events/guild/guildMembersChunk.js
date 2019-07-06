/* eslint-disable no-undef */
'use strict'
const { RichEmbed } = require("discord.js");
module.exports = (client, members, guild) => {
    if (!guild.available) return
    let embed = new RichEmbed()
        .setAuthor(" | Gank Guild", guild.iconURL)
        .setDescription(`Olá, você acabou de receber uma migração de servidor, \n` +
            `muitos membros de um mesmo servidor entraram no seu`)
        .addField("Guild", `\`\`${guild.name}\`\``, true)
        .addField("Dono:", `<@${guild.owner.id}>`, true)
        .setColor("C50404")
        .setFooter(client.owner().user.username, client.owner().user.avatarURL)
        .setTimestamp();
    guild.owner.send(embed).catch(() => { });
}