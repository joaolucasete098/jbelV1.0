/* eslint-disable no-undef */
'use strict'

const { RichEmbed } = require("discord.js");
const ServerLogs = getmodule('controllers/ServerLogs')
module.exports = (client, unbanGuild, user) => {
    if (!unbanGuild) return;
    const unban = new ServerLogs(client.datasource, unbanGuild.id)
    unban.getAll().then(async guildTable => {
        if (!guildTable.unban.type) return 0;
        let channel = unbanGuild.channels.get(guildTable.unban._idChannel);
        if (!channel) return 0;
        let embed = new RichEmbed()
            .setAuthor(user.username, user.displayAvatarURL)
            .setTitle("Ban | Removido")
            .addField("Usuário:", user)
            .addField("Tag:", user.tag)
            .setColor("05A206")
            .setThumbnail(user.displayAvatarURL)
            .setFooter(`ID: ${user.id}`, unbanGuild.iconURL)
            .setTimestamp();
        channel.send(embed).catch(() => { });
    });
};