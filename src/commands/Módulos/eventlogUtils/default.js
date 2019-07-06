module.exports = async (client, message, args, RichEmbed, prefix, eventlog, guild) => {
    var utils = client.eventlogUtils;
    var paginas = [
        utils.config(client, RichEmbed, prefix),
        utils.ban(client, message, args, RichEmbed, prefix, eventlog, guild),
        utils.delet(client, message, args, RichEmbed, prefix, eventlog, guild),
        utils.edit(client, message, args, RichEmbed, prefix, eventlog, guild),
        utils.unban(client, message, args, RichEmbed, prefix, eventlog, guild),
    ];
    var emojis = [
        client.getEmoji("voltarjbel"),
        client.getEmoji("banjbel"),
        client.getEmoji("deleteMessage"),
        client.getEmoji("editar"),
        client.getEmoji("user")
    ];
    let msg = await message.channel.send(paginas[0]);
    const filter = (reaction, user) => {
        return user.id === message.author.id;
    };
    msg.createReactionCollector(filter, { time: 1000 * 60 }).on("collect", async e => {
        let index = emojis.findIndex(i => i.name ? i.name === e.emoji.name : i === e.emoji.name);
        if (index < 0) return;
        await msg.edit(paginas[index]).then('').catch(() => { });
    }).on("end", () => {
        msg.delete().catch(() => { });
    });
    // Nao troque este 'for' por um 'forEach'
    // Alem de ser mais lento os emojis vao estar na ordem errada
    for (let i = 0; i < emojis.length; ++i) {
        await msg.react(emojis[i]).catch(() => { });
    }

};