module.exports = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.send(`${client.getEmoji('6445_ModWarning')} **|Você não tem permissão de setar tags!**`)
    let role = message.mentions.roles.first();
    if (!role)
        return message.reply("Insira um cargo válido do servidor")
    message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(role))
    message.channel.send(`**${message.author.username}**, role **${role.name}** was added to all members`)
}