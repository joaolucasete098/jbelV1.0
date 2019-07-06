/* eslint-disable no-undef */
'use strict'
const moment = require('moment')
const { RichEmbed } = require('discord.js')
const ServerLogs = getmodule('controllers/ServerLogs')
module.exports = async (client, message) => {
    if (!message.guild) return;
    const deletar = new ServerLogs(client.datasource, message.guild.id)
    deletar.getAll().then(async guildTable => {
        var now = moment();
        let channel = message.guild.channels.get(guildTable.delet._idChannel);
        if (!channel) return 0;
        let guild = message.guild;
        let auditLogs = await guild.fetchAuditLogs({ limit: 1, type: "MESSAGE_DELETE" });
        var executor = message.author;
        auditLogs.entries.forEach(entry => {
            if (moment(now).diff(entry.createdTimestamp, "ms") < 750) {
                executor = entry.executor;
            }
        });
        let msg = message.content.replace(/`/g, "")
        if (msg.length + "```\n```".length > 1024) return 0;
        let embed = new RichEmbed()
            .setTitle(`${client.getEmoji('del')} **Mensagem Deletada**`)
            .addField(`${client.getEmoji('user')} Enviada por:`, message.author, true)
            .addField(`${client.getEmoji('deletar')} Deletada por:`, executor, true)
            .addField(`${client.getEmoji('canal')} Canal:`, `${message.channel}`, true)
            .addField(`${client.getEmoji('msg')} Mensagem:`, `**${msg}**`)
            .setColor("BLACK")
            .setFooter(message.author.id, message.author.displayAvatarURL)
            .setTimestamp();
        channel.send(embed).catch(() => { });
    })
}