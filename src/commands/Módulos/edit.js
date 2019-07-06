/* eslint-disable no-undef */
const ConfigGuild = getmodule('controllers/ConfigGuild')

module.exports = (client, message, args, RichEmbed, prefix) => {
    const guild = new ConfigGuild(client.datasource, message.guild.id)
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    guild.getAll().then(guildTable => {
        if (args.length < 1) {
            client.editUtils.default(client, message, args, RichEmbed, prefix, guildTable);
            return 0;
        }
        var cmd = client.editUtils[args[0]];
        if (cmd) {
            cmd(client, message, args, RichEmbed, guild); 
        } else {
            // O reth n tem essa resposta pra esse comando
            //client.editUtils.typo(message, prefix);
        }
    });
    return 0;
};