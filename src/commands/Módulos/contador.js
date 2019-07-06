/* eslint-disable no-undef */
const Contador = getmodule('controllers/Contador')

module.exports = (client, message, args, RichEmbed, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    const contador = new Contador(client.datasource, message.guild.id)
    contador.getAll().then(guildTable => {
        if (args.length < 1) {
            client.contadorUtils.default(client, message, args, RichEmbed, prefix, guildTable);
            return 0;
        }
        var cmd = client.contadorUtils[args[0]];
        if (cmd) {
            cmd(client, message, args, RichEmbed, contador,guildTable);
        } else {
            client.contadorUtils.typo(message, prefix);
        }
    });
    return 0;
};