/* eslint-disable no-undef */
'use strict'
const GuildAll = getmodule('controllers/GuildAll')
module.exports = (client, guildMember) => {
    if (!guildMember) return
    const guildAll = new GuildAll(client.datasource, guildMember.guild.id)
    guildAll.getAll().then(guildTable => {
        console.log(guildTable.Contador.status)
        if (guildTable.Contador.status) {
            client.emit("contador", guildMember.guild, guildTable.Contador);
        }
        let saidaChannel = guildMember.guild.channels.get(guildTable.Welcome.saida._idChannel);
        if (saidaChannel) {
            let message = guildTable.Welcome.saida.text;
            message = message.replace(/\$\{USER\}/g, `<@${guildMember.user.id}`);
            message = message.replace(/\$\{SERVER\}/g, guildMember.guild.name);
            saidaChannel.send(message).catch(() => { });
        }
    })
    /*
     * Deletar membro do registro do servidor
    */
    /*let registradores = guildTable.registradores;
    for (let i = 0; i < registradores.length; ++i) {
        let membros = registradores[i].membrosRegistrados;
        for (let u = 0; u < membros.length; ++u) {
            if (membros[u]._id === guildMember.id) {
                membros.splice(u, 1);
                guildTable.save().catch(console.error);
                return;
            }
        }
    }
});*/
};