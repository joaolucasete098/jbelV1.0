module.exports = (client, message, args, RichEmbed, guildTable) => {
    if (args.length < 2) {
        return 0;
    }
    guildTable.updateElement({ privado: args.slice(1).join(' ') })
        .then(() => {
            message.channel.send("A mensagem de DM foi configurada com sucesso!");
        }).catch((err) => {
            console.log(err);
            message.reply("Erro");
        })

};