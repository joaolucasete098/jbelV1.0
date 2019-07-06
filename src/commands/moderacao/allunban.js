module.exports = async (client, message, args, RichEmbed) => {
    if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(`${client.getEmoji('negado')} **|Você não tem permissão de desbanir membros!**`);

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.channel.send(`${client.getEmoji('negado')} **|Eu não tenho permissão de desbanir membros!**`);

    let bannedUsers = await message.guild.fetchBans()
    let size = bannedUsers.size
    let user = message.author;
    let embedAllUnban = new RichEmbed()
        .setTitle('Desbanimento')
        .setColor("36393e")
        .setFooter(user.tag, user.avatarURL)

    if (!size) {
        embedAllUnban.setDescription(':confused: Não há usuários banidos no servidor!')
        message.channel.send(embedAllUnban);
        return 0;
    }
    embedAllUnban.setDescription(`Começando | 0/${size}`)
    message.channel.send(embedAllUnban).then(async m => {
        let i = 1;
        for (let user of bannedUsers.values()) {
            await m.guild.unban(user).then(() => {
                m.edit(embedAllUnban.setDescription(`Começando | ${i}/${size}`))
                    .catch(() => { })
            }).catch(() => { })
            ++i
        }
        m.edit(embedAllUnban.setDescription(`Todos membros foram desbanidos`))
            .catch(() => { })
    }).catch(err => console.log(err));
}