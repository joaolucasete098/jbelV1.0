/* eslint-disable no-undef */
'use strict'
const GuildAll = getmodule('controllers/GuildAll')
module.exports = (client, guildMember) => {
    if (!guildMember) return
    const guildAll = new GuildAll(client.datasource, guildMember.guild.id)
    guildAll.getAll().then(guildTable => {
        if (guildTable.Contador.status) {
            client.emit("contador", guildMember.guild, guildTable.Contador);
        }
        welcome(guildMember, guildTable);
        autoRole(guildMember, guildTable);
        botKick(guildMember, guildTable);
        /*muteMember(client, guildMember);*/
    }).catch(err => console.log(err));
    return 0;
};

var welcome = (guildMember, guildTable) => {
    let welcomeChannel = guildMember.guild.channels.get(guildTable.Welcome.welcome._idChannel);
    if (welcomeChannel) {
        let message = guildTable.Welcome.welcome.text;
        if (!message.length) return 0;
        message = message.replace(/\$\{USER\}/g, guildMember);
        message = message.replace(/\$\{SERVER\}/g, guildMember.guild.name);
        message = message.replace(/\$\{user-avatar-url\}/g, guildMember.avatarURL);
        welcomeChannel.send(message).catch(() => { });
    }
    if (guildTable.Welcome.privado.length) {
        let message = guildTable.Welcome.privado;
        if (!message.length) return 0;
        message = message.replace(/\$\{USER\}/g, guildMember);
        message = message.replace(/\$\{SERVER\}/g, guildMember.guild.name);
        guildMember.send(message).catch(() => { });
    }
};

var autoRole = (guildMember, guildTable) => {
    let autoRole = guildMember.guild.roles.get(guildTable.ConfigGuild.novato);
    if (autoRole) {
        guildMember.addRole(autoRole).catch(() => { });
    }
};

var botKick = (guildMember, guildTable) => {
    if (guildMember.user.bot && guildTable.ConfigGuild.filtroBots) {
        guildMember.kick("Anti bot ativo!").catch(() => { });
    }
};

/*var muteMember = async (client, guildMember) => {
    let guildMutes = client.mutes[guildMember.guild.id];
    if (!guildMutes) return;
    if (!guildMutes[guildMember.id]) return;
    let muteRole = guildMember.guild.roles.find(i => i.name === "😡Reth mute🔇");
    if (!muteRole) muteRole = await guildMember.guild.createRole({ name: "😡Reth mute🔇" });
    void (muteRole && guildMember.addRole(muteRole));
};*/