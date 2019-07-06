/* eslint-disable no-undef */
module.exports = (client, message, args, RichEmbed, guild, config) => {
    if (!config.Adv)
        return message.reply("Advertência ja está desativado no servidor")
    guild.updateElement({ Adv: false }).then(() => {
        let embed = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`**Advertência foi desativada no servidor!**`)
            .setColor("4959E9")
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
        message.channel.send(embed).catch(() => { })
    })
};