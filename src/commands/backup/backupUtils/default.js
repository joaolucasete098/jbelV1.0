/* eslint-disable no-undef */
module.exports = (client, message, args, RichEmbed, prefix) => {
    let embed = new RichEmbed()
        .setAuthor(' | Servidor Backup', message.author.displayAvatarURL)
        .setDescription(`**Estes comandos possibilitam você a criar um backup do seu servidor` +
            ` tal como salvar todas as roles, calls e configuração de permissões!**\n` +
            `\`\`${prefix}create: cria um backup do servidor\`\`\n` +
            `\`\`${prefix}load <backupID>: carrega o backup em um servidor\`\`\n` +
            `\`\`${prefix}info <backupID>: mostra informações de um backup\`\`\n`)
        .setColor("4959E9")
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
    message.channel.send(embed).catch(() => { })
};