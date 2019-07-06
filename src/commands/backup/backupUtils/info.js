const backup = require('discord-backup')
const moment = require('moment')
moment.locale('pt-br')
module.exports = (client, message, args, prefix, RichEmbed) => {
    let backupID = args[1];
    if (!backupID) {
        return message.channel.send(":x: | Você precisa especificar um backup válido!");
    }
    backup.fetch(backupID).then((backupInfos) => {
        let embed = new RichEmbed()
            .setAuthor("Backup Informations")
            .addField("ID", backupInfos.ID, true)
            .addField("Servidor nome", backupInfos.name, true)
            .addField("Servidor ID", backupInfos.guildID, false)
            .addField("Tamanho", backupInfos.size, true)
            .addField("Criado", moment(backupInfos.createdTimestamp).format('LLLL'), true)
            .setColor("#FF0000");
        message.channel.send(embed);
    }).catch((err) => {
        // if the backup wasn't found
        return message.channel.send(err + `:x: | Nenhum backup encontrado para \`\`${backupID}!\`\``);
    });
}