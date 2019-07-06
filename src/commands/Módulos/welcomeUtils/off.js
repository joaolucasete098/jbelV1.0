const { RichEmbed } = require("discord.js");

module.exports = (client, message, args, RichEmbed, guildTable) => {
    if (args.length < 2) {
        return 0;
    }
    if (args[1] === "privado") {
        guildTable.updateElement({ privado: '' })
    } else if ((args[1] === "welcome" || args[1] === "saida")) {
        guildTable.updateElement({ '_idChannel': '' }, args[1])
    } else {
        return;
    }
    let msg = args[1];
    if (args[1] === "welcome" && args[1] !== "saida") {
        msg = "boas vindas";
    }
    if (args[1] === "privado") {
        msg += "no privado"
    }
    let embed = new RichEmbed()
        .setDescription(`**A mensagem de ${msg} foi desativada com sucesso!**`)
        .setColor("4959E9")
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp();
    message.channel.send(embed);
};