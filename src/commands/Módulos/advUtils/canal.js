/* eslint-disable no-undef */
const Registro = getmodule('controllers/Registro')
module.exports = (client, message, config, member, RichEmbed) => {
    const registro = new Registro(client.datasource, message.guild.id)
    registro.getElement(message.author.id, 'membrosRegistrados').then(async guildTable => {
        let m = 0
        let f = 0
        let nb = 0
        const registros = await Object.values(guildTable)
        const size = registros.length
        for (let i = 0; i < size; i++) {
            if (registros[i].genero === "M")++m;
            else if (registros[i].genero === "F")++f;
            else ++nb
        }
        let embedDM1 = new RichEmbed()
            .setTitle(`Log | Registro`)
            .addField('Staff: ', message.author, true)
            .addField('Membro Registrado: ', `<@${member.id}>`, true)
            .addField(`Total de membros registrados`, `**${m + f + nb}** membros`)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp()
            .setColor("#f8f403");

        let canal = message.guild.channels.get(config.channelRegister)
        if (canal) return canal.send(embedDM1)
        message.channel.send(embedDM1)
    })
}