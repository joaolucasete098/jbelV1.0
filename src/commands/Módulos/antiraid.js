/* eslint-disable no-undef */
const ConfigGuild = getmodule('controllers/ConfigGuild')
const AntiRaid = getmodule('controllers/AntiRaid')
module.exports = (client, message, args, RichEmbed, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    const guild = new ConfigGuild(client.datasource, message.guild.id)
    const antiraid = new AntiRaid(client.datasource, message.guild.id)
    guild.getAll().then(guildTable => {
        if (args.length < 1) {
            client.antiraidUtils.default(client, message, args, RichEmbed, prefix, guildTable);
            return 0;
        }
        var cmd = client.antiraidUtils[args[0]];
        if (cmd) {
            cmd(client, message, args, prefix, RichEmbed, antiraid, guildTable);
        } else {
            client.antiraidUtils.typo(message);
        }
    });
};