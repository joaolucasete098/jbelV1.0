/* eslint-disable no-undef */
const Prefix = getmodule('controllers/Prefix')
module.exports = (client, message, args, RichEmbed) => {
    const prefixo = new Prefix(client.datasource, message.guild.id)
    if (!args.length)
        return message.reply(`Você se esqueceu de informar o \`\`novo prefixo\`\``)
    const prefix = args[0]
    prefixo.updateElement({ prefix })
        .then(() => {
            const embedPrefix = new RichEmbed()
                .setTitle(`${client.getEmoji("discord")} | **Atualizando**`)
                .addField(`Novo prefixo é:`, `**\`\`${prefix}\`\`**`)
                .setColor('#0000CD')
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL)
            message.channel.send(embedPrefix)
        })
}