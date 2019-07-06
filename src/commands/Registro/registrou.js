/* eslint-disable no-undef */
const Registro = getmodule('controllers/Registro')
const moment = require("moment");
moment.locale("pt-BR");

module.exports = (client, message, args, RichEmbed) => {
    const registro = new Registro(client.datasource, message.guild.id)
    registro.getAll().then(async guildTable => {
        const registradores = Object.keys(guildTable)
        const size = registradores.length
        if (size) {
            var registradorID = "";
            var timestamp = 0;
            for (let u = 0; u < registradores.length; ++u) {
                const registros = await registro.getElement(registradores[u], 'membrosRegistrados')
                const memberArr = Object.keys(registros)
                const memberArrInf = Object.values(registros)
                for (let i = 0; i < memberArr.length; ++i) {
                    if (memberArr[i] === message.author.id) {
                        registradorID = registradores[u];
                        timestamp = memberArrInf[i].timestamp;
                        u = registradores.length;
                        break;
                    }
                }
            }
            if (registradorID.length) {
                let embed = new RichEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setTitle("**Informações:**")
                    .addField("**Usuário:**", `${message.author}`, true)
                    .addField("**Registrado por:**", `<@${registradorID}>`, true)
                    .addField("Data do registro:", `\`\`\`\n${moment(timestamp).format("LL")}\`\`\``, false)
                    .addField(":calendar_spiral: **__Conta criada:__**", moment(message.author.createdTimestamp).format("LL"), true)
                    .addField(":gear: Dias no Discord:", `${moment().diff(message.author.createdTimestamp, "days")} dias`, true)
                    .addField(":calling: Entrou no Server:", moment(message.member.joinedTimestamp).format("LL"), true)
                    .addField(":gear: Dias no Servidor:", `${moment().diff(message.member.joinedTimestamp, "days")} dias`, true)
                    .setColor("FF2227")
                    .setThumbnail(message.author.displayAvatarURL)
                    .setFooter(message.guild.name, message.guild.iconURL)
                    .setTimestamp();
                message.channel.send(embed);
                return 0;
            }
        }
        message.reply("Usuário não registrado, fale com um registrador.");
    });
};