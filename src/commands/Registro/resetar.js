const Registro = getmodule('controllers/Registro')
module.exports = (client, message, args, RichEmbed) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("O comando está disponível apenas para administradores.");
        return 0;
    }
    const registro = new Registro(client.datasource, message.guild.id)
    registro.deletar()
        .then(() => {
            message.reply("Histórico de registros apagado");
        }).catch(err => {
            console.log(err);
            message.reply("Erro");
        });
};