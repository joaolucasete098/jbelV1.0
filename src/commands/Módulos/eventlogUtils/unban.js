module.exports = (client, message, args, RichEmbed, prefix, guildTable, guild) => {
    let embed = new RichEmbed()
        .setDescription(`<a:staff:562062709332639751> | Olá <@${message.author.id}> | <a:staff:562062709332639751>\nEssas são minhas configurações de unban!`)
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
        .setColor(0x14b4fd)
    let unbanDelet = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs canal unban #mcertotoramento\`\`\``;
    if (guildTable.unban._idChannel) {
        unbanDelet = `${client.getEmoji("certo")} Ativo | Canal: <#${guildTable.unban._idChannel}> | ${prefix}logs canal unban off`;
    }
    let unbanTexto = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs unban on\`\`\``;
    if (guildTable.unban.type) {
        unbanTexto = `${client.getEmoji("certo")} Ativo | ${prefix}logs unban off`;
    }
    embed.addField("Eventlog | Define o canal do log unban:", unbanDelet);
    embed.addField("unban | Mostra o evento de membros desbanidos:", unbanTexto);

    if (args.length < 2 && args[0] === 'unban')
        return message.channel.send(embed)
    if (args.length < 2) return embed
    if (!["on", "off"].includes(args[1])) {
        return 0
    }
    guild.updateElement('unban', { 'type': args[1] === "on" })
        .then(() => {
            args[1] === "on" ?
                message.channel.send(`O log de usuários desbanidos foi habilitado com sucesso!`) :
                message.channel.send(`O log de usuários desbanidos foi desabilitado com sucesso!`)
        })
};
