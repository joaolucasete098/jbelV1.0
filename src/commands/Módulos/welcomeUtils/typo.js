const { RichEmbed } = require("discord.js");

module.exports = (message, prefix) => {
    let embed = new RichEmbed()
    .setTitle("**Você digitou alguma coisa errada**")
    .setDescription(`digite: ${prefix}welcome`)
    .setColor("00D8D8")
    .setFooter("codando", message.author.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed).catch(()=>{});
};