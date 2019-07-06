const backup = require('discord-backup')
module.exports = (client, message, args) => {
    // Check member permissions
    console.log(args)
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
    }
    let backupID = args[1];
    if (!backupID) {
        return message.channel.send(":x: | You must specify a valid backup ID!");
    }
    // Fetching the backup to know if it exists
    backup.fetch(backupID).then(async () => {
        // If the backup exists, request for confirmation
        message.channel.send(`:warning: | Para começar a carregar o backup escreva \`\`confirmar\`\`!`);
        await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirmar"), {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).then(() => {
            message.author.send(`:white_check_mark: | \`\`Começando a carregar o backup!\`\``);
            backup.load(backupID, message.guild).then(() => {
                message.author.send(`\`\`Backup finalizado\`\``)
            }).catch((err) => {
                return message.author.send(err + ":x: | Desculpe, um erro ocorreu... por favor check se eu tenho permissões de administrador!");
            });
        }).catch((err) => {
            return message.channel.send(err + ":x: | Tempo acabou, cancelando carregamento do backup!");
        });
    }).catch((err) => {
        return message.channel.send(err + ":x: | Nenhum backup encontrado `" + backupID + "`!");
    });
}