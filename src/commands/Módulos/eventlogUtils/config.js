module.exports = (client, RichEmbed, prefix) => {
    let embed = new RichEmbed()
        .setTitle(`• Olá, Para entrar nos módulos de Eventos de logs é só reagir ou digitar! •`)
        .setDescription(`
            ${client.getEmoji("voltarjbel")} | **principal**\n` +
            `${client.getEmoji("banjbel")} | **usúarios banidos** \`\`${prefix}logs ban\`\`\n` +
            `${client.getEmoji("deleteMessage")} | **mensagens deletadas** \`\`${prefix}logs delet\`\`\n` +
            `${client.getEmoji("editar")} | **mensagens editadas** \`\`${prefix}logs edit\`\`\n` +
            `${client.getEmoji("user")} | **usúarios desbanidos** \`\`${prefix}logs unban\`\``)
        .setColor("36393f")
        .setFooter("Página 1 de 4");
    return embed;
};