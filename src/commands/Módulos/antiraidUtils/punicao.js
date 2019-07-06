
module.exports = (client, message, args, prefix, RichEmbed, guild) => {
    if (!['ban', 'kick', 'alert'].includes(args[1]))
        return message.reply(`você deve utilizar o comando corretamente | Use: \`\`${prefix}antiraid punicao <ban/kick/alert>\`\``)
    guild.updateElement({ 'punishment': args[1] })
        .then(() => {
            message.channel.send(`Punição atualizada com sucesso para \`\`${args[1]}\`\``);
        }).catch(err => {
            console.log(err);
            message.reply("Erro");
        });
};