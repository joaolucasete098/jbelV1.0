const moment = require('moment')
moment.locale('pt-br')
module.exports = (client, message, args, RichEmbed) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply("Insira um membro válido do servidor")
        .then(msg => msg.delete(2000))
    let role = args[1]
    if (role.includes('<@&'))
        role = args[1].slice(3, -1)
    const area = message.guild.roles.find(r => r.id === role)
    if (!area) return message.reply('Insira um cargo válido')
    const embedStaff = new RichEmbed()
        .setAuthor('💎 | Recrutamento')
        .addField('⚙ Recrutador', `<@${message.author.id}>`, true)
        .addField('📌 Recrutado', `<@${member.user.id}>`, true)
        .addField('🔧 Área: ', `<@&${area.id}>`, true)
        .addField('📅 Data: ', `\`\`${moment(new Date()).format('DD/MM/YY')}\`\``, true)
        .setColor(0x00ff00)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter(message.guild.name, message.guild.iconURL)
    message.channel.send(embedStaff)
}