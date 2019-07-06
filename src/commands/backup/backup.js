/* eslint-disable no-undef */
module.exports = (client, message, args, RichEmbed, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    if (args.length < 1) {
        client.backupUtils.default(client, message, args, RichEmbed, prefix);
        return 0;
    }
    var cmd = client.backupUtils[args[0]];
    if (cmd) {
        cmd(client, message, args, prefix, RichEmbed);
    } else {
        client.backupUtils.typo(message, prefix);
    }
};