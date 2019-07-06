/* eslint-disable no-undef */
module.exports = (client, message, args, RichEmbed, prefix, config) => {
    let msgAdv = config.Adv ?
        `${client.getEmoji("certo")} Ativo | \`\`Use: ${prefix}adv off\`\`` :
        `${client.getEmoji("negado")} Desativado | \`\`Use: ${prefix}adv on\`\``;
    let embed = new RichEmbed()
        .setAuthor(' | Configuração Advertências', message.author.displayAvatarURL)
        .setDescription(`A advertência serve para silenciar um usúario por um tempo definido ` +
            `não deixando-o acessar nenhum chat do servidor. Esse comando pode ser usado como ` +
            `punição por algum comportamento inapropriado`)
        .addField("Advertência", msgAdv, false)
        .setColor("4959E9")
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp()
    message.channel.send(embed).catch(() => { })
};