module.exports = (client, message, args, RichEmbed, guildTable) => {
    if (args.length < 2) {
        return 0;
    }
    guildTable.updateElement({ 'text': args.slice(1).join(' ') }, 'welcome')
        .then(() => {
            message.channel.send("A mensagem de boas vindas foi configurada com sucesso!");
        }).catch(err => {
            console.log(err);
            message.reply("Erro");
        });
};