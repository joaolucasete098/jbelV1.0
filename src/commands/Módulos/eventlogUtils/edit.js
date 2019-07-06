module.exports = (client, message, args, RichEmbed, prefix, guildTable, guild) => {
    let embed = new RichEmbed()
        .setDescription(`<a:staff:562062709332639751> | Olá <@${message.author.id}> | <a:staff:562062709332639751>\nEssas são minhas configurações de edit!`)
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
        .setColor(0x14b4fd)
    let canalEdit = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs canal edit #mcertotoramento\`\`\``;
    if (guildTable.edit._idChannel) {
        canalEdit = `${client.getEmoji("certo")} Ativo | Canal: <#${guildTable.edit._idChannel}> | ${prefix}logs canal edit off`;
    }
    let editTexto = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs edit on\`\`\``;
    if (guildTable.edit.type) {
        editTexto = `${client.getEmoji("certo")} Ativo | ${prefix}logs edit off`;
    }
    embed.addField("Eventlog | Define o canal do log edit:", canalEdit);
    embed.addField("Edit | Mostra o evento de mensagem editada:", editTexto);

    if (args.length < 2 && args[0] === 'edit')
        return message.channel.send(embed)
    if (args.length < 2) return embed
    if (!["on", "off"].includes(args[1])) {
        return 0
    }
    guild.updateElement('edit', { 'type': args[1] === "on" })
        .then(() => {
            args[1] === "on" ?
                message.channel.send(`O log de mensagens editadas foi habilitado com sucesso!`) :
                message.channel.send(`O log de mensagens editadas foi desabilitado com sucesso!`)
        })
};