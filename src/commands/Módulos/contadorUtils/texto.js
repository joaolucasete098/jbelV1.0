module.exports = (client, message, args, prefix, guildTable, contador) => {
    if (args.length < 2) {
        guildTable.updateElement({ text: "" })
            .then(() => {
                message.reply("Texto removido");
                client.emit("contador", message.guild, contador);
            }).catch(console.error);
        return 0;
    }
    if (contador.status === false) {
        message.reply("Você não definiu o canal do contador!");
        return 0;
    }
    guildTable.updateElement({ text: args.slice(1).join(' ') })
        .then(() => {
            message.reply("Você definiu a mensagem com sucesso!");
            client.emit("contador", message.guild, contador);
        }).catch(console.error);
};