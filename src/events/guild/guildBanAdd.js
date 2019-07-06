/* eslint-disable no-undef */
'use strict'
const { RichEmbed } = require("discord.js");
const ServerLogs = getmodule('controllers/ServerLogs')
const AntiRaid = require('./guildUtils/antiraid')
const ConfigGuild = getmodule('controllers/ConfigGuild')
module.exports = (client, banGuild, user) => {
    if (!banGuild.available) return;
    const config = new ConfigGuild(client.datasource, banGuild.id)
    const ban = new ServerLogs(client.datasource, banGuild.id)
    config.getElement('antiRaid').then(antiraid => {
        if (antiraid)
            AntiRaid(client, banGuild, user)
        ban.getAll().then(async guildTable => {
            if (!guildTable.ban.type) return 0;
            let channel = banGuild.channels.get(guildTable.ban._idChannel);
            if (!channel) return 0;
            let embed = new RichEmbed()
                .setAuthor(user.username, user.displayAvatarURL)
                .setTitle("Ban | Banido")
                .addField("Usuário:", user, true)
                .addField("Tag:", user.tag, true)
                .setColor("C50404")
                .setThumbnail(user.displayAvatarURL)
                .setFooter(`ID: ${user.id}`, banGuild.iconURL)
                .setTimestamp();
            channel.send(embed).catch(() => { });
        })
    })
};