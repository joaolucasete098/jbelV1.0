module.exports = async (client, message) => {
    if (message.author.id !== client.owner().id) return;
    client.user.setStatus('online')
    message.channel.send('Bot ativado com sucesso')
}