/* eslint-disable no-undef */
const ConfigGuild = getmodule('controllers/ConfigGuild')
module.exports = (client, message, args, prefix, RichEmbed) => {
    if (!['off', 'on'].includes(args[1])) 
        return message.reply(`você deve utilizar o comando corretamente | Use: \`\`${prefix}antiraid\`\``)
    const config = new ConfigGuild(client.datasource, message.guild.id)
    config.updateElement({ antiRaid: args[1] === "on" }).then(() => {
        let embed = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`**Anti-Raid foi ${args[1] === "on" ? "ativado" : "desativado"}!**`)
            .setColor("4959E9")
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp();
        message.channel.send(embed);
    })
};