module.exports = (client, message, args, RichEmbed, guild) => {
    if (args.length < 3) {
        message.reply("Você não especificou o canal!");
        return 0;
    }
    if (args[1] === 'adv')
        return channelAdv(args[2], guildID(message, args[2]), guild, message)
    channelRegister(args[2], guildID(message, args[2]), guild, message)
};

const channelRegister = (args, canalID, guild, message) => {
    if (args === "off") {
        guild.updateElement({ 'channelRegister': "" })
            .then(() => {
                message.channel.send(`Canal de Logs de Registro desativado`)
            }).catch(console.error)

    } else {
        if (!canalID) return message.reply("Canal inválido")
        guild.updateElement({ 'channelRegister': canalID })
            .then(() => {
                message.channel.send(`O canal <#${canalID}> foi definido com sucesso!`)
            }).catch(console.error)
    }
}
const channelAdv = (args, canalID, guild, message) => {
    if (args === "off") {
        guild.updateElement({ 'channelAdv': "" })
            .then(() => {
                message.channel.send(`Canal de Logs de advertências desativado`)
            }).catch(console.error)

    } else {
        if (!canalID) return message.reply("Canal inválido")
        guild.updateElement({ 'channelAdv': canalID })
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