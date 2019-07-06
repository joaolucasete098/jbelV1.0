module.exports = async (client, message) => {
    if (message.author.id !== client.owner().id) return;
    client.user.setStatus('offline')
    message.channel.send('Bot desativado com sucesso')
}