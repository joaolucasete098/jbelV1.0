module.exports = async (client, message, args, RichEmbed, prefix, guildTable, guild) => {
    if (args.length < 2) {
        message.reply("Você não especificou o canal!");
        return 0;
    }
    if (args[1] === 'ban') ban(args[2], guildID(message, args[2]), guild, message)
    if (args[1] === 'unban') unban(args[2], guildID(message, args[2]), guild, message)
    if (args[1] === 'edit') edit(args[2], guildID(message, args[2]), guild, message)
    if (args[1] === 'delet') delet(args[2], guildID(message, args[2]), guild, message)
};

const ban = (args, canalID, guild, message) => {
    if (args === "off") {
        guild.updateElement('ban', { _idChannel: "" })
            .then(() => {
                message.channel.send(`Canal de log ban desativado!`)
            }).catch(console.error)

    } else {
        if (!canalID) return message.reply("Canal inválido")
        guild.updateElement('ban', { _idChannel: canalID })
            .then(() => {
                message.channel.send(`O canal <#${canalID}> foi definido com sucesso!`)
            }).catch(console.error)
    }
}
const unban = (args, canalID, guild, message) => {
    if (args === "off") {
        guild.updateElement('unban', { _idChannel: "" })
            .then(() => {
                message.channel.send(`Canal de log unban desativado!`)
            }).catch(console.error)
    } else {
        if (!canalID) return message.reply("Canal inválido")
        guild.updateElement('unban', { _idChannel: canalID })
            .then(() => {
                message.channel.send(`O canal <#${canalID}> foi definido com sucesso!`)
            }).catch(console.error)
    }
}

const edit = (args, canalID, guild, message) => {
    if (args === "off") {
        guild.updateElement('edit', { _idChannel: "" })
            .then(() => {
                message.channel.send(`Canal de log edit desativado!`)
            }).catch(console.error)
    } else {
        if (!canalID) return message.reply("Canal inválido")
        guild.updateElement('edit', { _idChannel: canalID })
            .then(() => {
                message.channel.send(`O canal <#${canalID}> foi definido com sucesso!`)
            }).catch(console.error)
    }
}

const delet = (args, canalID, guild, message) => {
    if (args === "off") {
        guild.updateElement('delet', { _idChannel: "" })
            .then(() => {
                message.channel.send(`Canal de log delet desativado!`)
            }).catch(console.error)
    } else {
        if (!canalID) return message.reply("Canal inválido")
        guild.updateElement('delet', { _idChannel: canalID })
            .then(() => {
                message.channel.send(`O canal <#${canalID}> foi definido com sucesso!`)
            }).catch(console.error)
    }
}

const guildID = (message, args) => {
    let mentionTest = /<#[0-9]{18}>/.test(args) && args.length === 21;
    let idTest = /[0-9]{18}/.test(args) && args.length === 18;
    if (!mentionTest && !idTest)
        return 0;
    let canalID = args.slice(args.length - 19, args.length - 1);
    let canal = message.guild.channels.get(canalID);
    if (!canal)
        return 0;
    return canalID
}