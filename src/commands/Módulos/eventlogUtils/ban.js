module.exports = (client, message, args, RichEmbed, prefix, guildTable, guild) => {
    let embed = new RichEmbed()
        .setDescription(`<a:staff:562062709332639751> | Olá <@${message.author.id}> | <a:staff:562062709332639751>\nEssas são minhas configurações de Ban!`)
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
        .setColor(0x14b4fd)
    let canalTexto = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs canal ban #mcertotoramento\`\`\``;
    if (guildTable.ban._idChannel) {
        canalTexto = `${client.getEmoji("certo")} Ativo | Canal: <#${guildTable.ban._idChannel}> | ${prefix}logs canal ban off`;
    }
    let banTexto = `${client.getEmoji("negado")} Desativado | **Exemplo:**` + `\`\`\`css\n${prefix}logs ban on\`\`\``;
    if (guildTable.ban.type) {
        banTexto = `${client.getEmoji("certo")} Ativo | ${prefix}logs ban off`;
    }
    embed.addField("Eventlog | Define o canal do log Ban:", canalTexto);
    embed.addField("Ban | Mostra o evento de membros banidos:", banTexto);

    if (args.length < 2 && args[0] === 'ban')
        return message.channel.send(embed)
    if (args.length < 2) return embed
    if (!["on", "off", "canal"].includes(args[1])) {
        return 0
    }
    guild.updateElement('ban', { 'type': args[1] === "on" })
        .then(() => {
            args[1] === "on" ?
                message.channel.send(`O log de membros banidos foi habilitado com sucesso!`) :
                message.channel.send(`O log de membros banidos foi desabilitado com sucesso!`)
        })
};