/* eslint-disable no-undef */
const ServerLogs = getmodule('controllers/ServerLogs')

module.exports = (client, message, args, RichEmbed, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    const guild = new ServerLogs(client.datasource, message.guild.id)
    guild.getAll().then(guildTable => {
        if (args.length < 1) {
            client.eventlogUtils.default(client, message, args, RichEmbed, prefix, guildTable, guild);
            return 0;
        }
        var cmd = client.eventlogUtils[args[0]];
        if (cmd) {
            cmd(client, message, args, RichEmbed, prefix, guildTable, guild);
        } else {
            client.eventlogUtils.typo(message, prefix);
        }
        message.delete().catch(() => { })
    });
    return 0;
};