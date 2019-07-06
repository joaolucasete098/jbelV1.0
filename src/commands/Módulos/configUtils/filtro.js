module.exports = (client, message, args, RichEmbed, guild) => {
    if (args[1] === "off" || args[1] === "on") {
        guild.updateElement({ filtroInvites: args[1] === "on" })
            .then(() => {
                let embed = new RichEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL)
                    .setDescription(`**Filtro de convites foi ${args[1] === "on" ? "ativado" : "desativado"}!**`)
                    .setColor("4959E9")
                    .setFooter(message.guild.name, message.guild.iconURL)
                    .setTimestamp();
                message.channel.send(embed);
            }).catch(console.error);
    }
};