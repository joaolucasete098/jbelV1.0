module.exports = (client, message, args) => {
    if (!args.length)
        return message.reply('Você se esqueceu de escrever o que eu devo falar')
            .then(m => m.delete(client.delTime))
    message.channel.send(args.slice(0).join(' '))
}