/* eslint-disable no-undef */

const Registro = getmodule('controllers/Registro')
module.exports = (client, message, args, RichEmbed, prefix, retry = 0) => {
    if (retry > 1) return 0;
    if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
        message.reply("O comando está disponível apenas para usuários STAFF.");
        return 0;
    }
    const registro = new Registro(client.datasource, message.guild.id)
    registro.getElement(message.author.id).then(async guildTable => {
        let msg = await message.channel.send(`${client.getEmoji("lag")} Procurando registros...`).catch(() => { });
        let m = 0
        let f = 0
        let nb = 0
        if (guildTable) {
            const registros = await Object.values(guildTable.membrosRegistrados)
            const size = registros.length
            for (let i = 0; i < size; i++) {
                if (registros[i].genero === "M")++m;
                else if (registros[i].genero === "F")++f;
                else ++nb
            }
        }
        let embed = new RichEmbed()
            .setAuthor(`Registrador: ${message.author.username}`, message.author.displayAvatarURL)
            .setTitle("**Informações:**")
            .addField(`**${client.getEmoji("homi")} __Masculino__**`, `\`\`\`js\nRegistrou: ${m}\`\`\``)
            .addField(`**${client.getEmoji("muie")} __Feminino__**`, `\`\`\`js\nRegistrou: ${f}\`\`\``)
            .addField(`**${client.getEmoji("muie")} __Não Binário__**`, `\`\`\`js\nRegistrou: ${nb}\`\`\``)
            .addField(`${client.getEmoji("sexy")} Registrou um:`, `\`\`\`js\nTotal de: ${f + m + nb}\`\`\``)
            .setColor("FF2227");
        msg.edit(embed).catch(() => { })
    })
}