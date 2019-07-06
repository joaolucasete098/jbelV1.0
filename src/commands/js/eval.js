module.exports = async (client, message, args, RichEmbed) => {
    if (message.author.id !== client.owner().id) return;
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        var emb = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .addField('Input', '```' + args.join(" ") + '```')
            .setColor('GREEN')
            .addField('Output', '```' + clean(evaled) + '```')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL)
        message.channel.send(emb)
    } catch (err) {
        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        var embed = new RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .addField('Erro', '```' + clean(err) + '```')
            .setColor('RED')
            .setFooter('Desculpe, mas você errou em alguma coisa ai viu!')
        message.channel.send(embed);
    }
}