/* eslint-disable no-undef */
const ConfigGuild = getmodule('controllers/ConfigGuild')
module.exports = (client, message, args, RichEmbed, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    const guild = new ConfigGuild(client.datasource, message.guild.id)
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    guild.getAll().then(guildTable => {
        if (args.length < 1) {
            client.configUtils.default(client, message, args, RichEmbed, prefix, guildTable);
            return 0;
        }
        var cmd = client.configUtils[args[0]];
        if (cmd) {
            cmd(client, message, args, RichEmbed, guild, guildTable);
        } else {
            client.configUtils.typo(message);
        }
    });
};