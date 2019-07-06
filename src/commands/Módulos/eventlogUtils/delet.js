module.exports = (client, message, args, RichEmbed, prefix, guildTable, guild) => {
    let embed = new RichEmbed()
        .setDescription(`<a:staff:562062709332639751> | Olá <@${message.author.id}> | <a:staff:562062709332639751>\nEssas são minhas configurações de delet!`)
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
        .setColor(0x14b4fd)
    let canalDelet = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs canal delet #mcertotoramento\`\`\``;
    if (guildTable.delet._idChannel) {
        canalDelet = `${client.getEmoji("certo")} Ativo | Canal: <#${guildTable.delet._idChannel}> | ${prefix}logs canal delet off`;
    }
    let deletTexto = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs delet on\`\`\``;
    if (guildTable.delet.type) {
        deletTexto = `${client.getEmoji("certo")} Ativo | ${prefix}logs delet off`;
    }
    embed.addField("Eventlog | Define o canal do log delet:", canalDelet);
    embed.addField("Delet | Mostra o evento de mensagem deletada:", deletTexto)

    if (args.length < 2 && args[0] === 'delet')
        return message.channel.send(embed)
    if (args.length < 2) return embed
    if (!["on", "off"].includes(args[1])) {
        return 0
    }
    guild.updateElement('delet', { 'type': args[1] === "on" })
        .then(() => {
            args[1] === "on" ?
                message.channel.send(`O log de mensagens deletadas foi habilitado com sucesso!`) :
                message.channel.send(`O log de mensagens deletadas foi desabilitado com sucesso!`)
        })
};