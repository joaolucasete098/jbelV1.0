/* eslint-disable no-undef */
'use strict'
const { RichEmbed } = require("discord.js");
const ServerLogs = getmodule('controllers/ServerLogs')
module.exports = (client, oldMessage, newMessage) => {
    if (!newMessage.guild) return;
    if ((oldMessage === newMessage) || (oldMessage.content === "" || newMessage.content === "")) return 0;
    const update = new ServerLogs(client.datasource, newMessage.guild.id)
    update.getAll().then(async guildTable => {
        let channel = newMessage.guild.channels.get(guildTable.edit._idChannel);
        if (!channel) return 0;
        let author = newMessage.author;
        let oldContent = oldMessage.content.replace(/`/g, "");
        let newContent = newMessage.content.replace(/`/g, "");
        if (oldContent.length + "**``\n``**".length > 1024) return 0;
        if (newContent.length + "**``\n``**".length > 1024) return 0;
        let embed = new RichEmbed()
            .setTitle(`${client.getEmoji('editar')} **Mensagem Editada**`)
            .addField(`${client.getEmoji('user')} Editada por: `, author, true)
            .addField(`${client.getEmoji('canal')} Canal:`, `${newMessage.channel}`, true)
            .addField(`${client.getEmoji('antiga')} Mensagem antiga:`, `**\`\`${oldContent}\`\`**`)
            .addField(`${client.getEmoji('nova')} Mensagem nova:`, `**\`\`${newContent}\`\`**`, true)
            .setColor("100C86")
            .setFooter(author.id, author.displayAvatarURL)
            .setTimestamp();
        channel.send(embed).catch(() => { });
    })
};