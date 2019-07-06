const backup = require('discord-backup')
module.exports = async (client, message, args, prefix) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
    }
    // Create the backup
    let msg = await message.channel.send('Criando backup, aguarde ...')
    backup.create(message.guild).then((backupID) => {
        msg.edit(`backup criado, Use: ${prefix}load ${backupID}`);
    });
}