module.exports = (client, message, args, RichEmbed, guild) => {
    var role = message.mentions.roles.first();
    if (!role) {
        message.reply("Cargo inválido");
        return 0;
    }
    guild.updateElement({ novato: role.id })
        .then(() => {
            let embed = new RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setDescription(`Você definiu o cargo ${role} Com sucesso.`)
                .setColor("4959E9")
                .setFooter(message.guild.name, message.guild.iconURL)
                .setTimestamp();
            message.channel.send(embed);
        }).catch(console.error);
};