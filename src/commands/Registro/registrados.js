/* eslint-disable no-undef */
const Registro = getmodule('controllers/Registro')
module.exports = (client, message, args, RichEmbed) => {
    const registro = new Registro(client.datasource, message.guild.id)
    registro.getAll().then(async guildTable => {
        let obj = {
            m: 0,
            f: 0,
            nb: 0,
            memberCount: message.guild.memberCount
        };
        if (guildTable) {
            const registradores = Object.keys(guildTable)
            const size = registradores.length
            for (let i = 0; i < size; i++) {
                const registros = await registro.getElement(registradores[i], 'membrosRegistrados')
                const membros = Object.values(registros)
                const size = membros.length
                for (let j = 0; j < size; j++) {
                    if (membros[j].genero === "M")++obj.m
                    else if (membros[j].genero === "F")++obj.f;
                    else ++obj.nb
                }
            }
        }
        let embed = new RichEmbed()
            .setTitle(":clipboard: Registros do servidor:")
            .setDescription(`Masculino: ${obj.m}\nFeminino: ${obj.f}\nNão Binário: ${obj.nb}\n\n` +
                `Total de usuários registrados: ${obj.m + obj.f + obj.nb}\n` +
                `Total de usuários sem registros: ${obj.memberCount - (obj.m + obj.f + obj.nb)}`)
            .setColor("4959E9")
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
        message.channel.send(embed);
    });
};