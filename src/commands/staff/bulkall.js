module.exports = async (client, message) => {
    let i = 0
    let fetched;
    fetched = await message.channel.fetchMessages({ limit: 100 });
    while (fetched.size >= 2) {
        await message.channel.bulkDelete(fetched.size)
        i += fetched.size
        fetched = await message.channel.fetchMessages({ limit: 100 });
    }
    message.channel.send(`Foram deletadas **${i} mensagens**`)
}