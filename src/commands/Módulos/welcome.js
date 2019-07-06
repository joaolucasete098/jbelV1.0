/* eslint-disable no-undef */
const Welcome = getmodule('controllers/Welcome')

module.exports = (client, message, args, RichEmbed, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    const welcome = new Welcome(client.datasource, message.guild.id)
    welcome.getAll().then(guildTable => {
        if (args.length < 1) {
            client.welcomeUtils.default(client, message, args, RichEmbed, prefix, guildTable);
            return 0;
        }
        var cmd = client.welcomeUtils[args[0]];
        if (cmd) {
            cmd(client, message, args, RichEmbed, welcome);
        } else {
            client.welcomeUtils.typo(message);
        }
    });
    return 0;
};