/* eslint-disable no-undef */
const ConfigGuild = getmodule('controllers/ConfigGuild')
const Adv = getmodule('controllers/Adv')
const ms = require('ms')
module.exports = (client, message, args, RichEmbed, prefix) => {
    const guild = new ConfigGuild(client.datasource, message.guild.id)
    const advertencia = new Adv(client.datasource, message.guild.id)
    if (!message.member.hasPermission("MUTE_MEMBERS", false, true, true)) {
        message.reply("**Você não possui permissões para utilizar esse comando!**");
        return 0;
    }
    guild.getAll().then(guildTable => {
        advertencia.getAll().then(cargos => {
            if (args.length < 1) {
                client.advUtils.default(client, message, args, RichEmbed, prefix, guildTable, guild);
                return 0;
            }
            if (['on', 'off'].includes(args[0]))
                var cmd = client.advUtils[args[0]];
            if (cmd)
                cmd(client, message, args, RichEmbed, guild, guildTable);
            else {
                if (!guildTable.Adv)
                    return message.reply(`Advertência não está ativa no servidor. Use: \`\`${prefix}adv on\`\``)
                let member = message.mentions.members.first() || message.guild.members.get(args[0])
                if (!member)
                    return message.reply("Insira um membro válido do servidor")
                let adv = args[1]
                if (!['1', '2', '3'].includes(adv))
                    return message.reply("Insira o número correto da advertência")
                advertir(message, member, adv, cargos, args.slice(2).join(' '), guildTable, RichEmbed)
            }
        })
    });
};

const advertir = (message, member, adv, cargos, reason, guildTable, RichEmbed) => {
    var roleA
    var roleR
    cargoID = Object.values(cargos)
    switch (adv) {
        case '1':
            roleA = cargoID[0]
            roleR = cargoID[1]
            tempo = '1h'
            break
        case '2':
            roleA = cargoID[2]
            roleR = cargoID[3]
            tempo = '5h'
            break
        case '3':
            roleA = cargoID[4]
            roleR = cargoID[5]
            tempo = '24h'
            break
    }
    veriffyMember(message, member, roleA, roleR)
        .then(() => {
            infoGuild(message, member, tempo, roleA, reason, guildTable, RichEmbed)
            member.addRole(roleA)
                .then(() => {
                    infoUser(message, member, true, RichEmbed, tempo, reason)
                    timeUser(message, member, tempo, roleA, roleR, RichEmbed)
                }).catch(() => { })
        }).catch(() => { })
}

const timeUser = (message, member, tempo, roleA, roleR, RichEmbed) => {
    setTimeout(() => {
        member.removeRole(roleA).then(() => {
            member.addRole(roleR)
            infoUser(message, member, false, RichEmbed)
            clearTimeout()
        })
    }, ms('1ms'))
}
const veriffyMember = (message, member, roleA, roleR) => {
    return new Promise((resolve, reject) => {
        if (member.roles.some(x => x.id === roleA)) {
            message.reply({
                embed: {
                    description: ':eyes: Eu vejo o usuário com esta advertência!',
                    color: 6066491
                }
            })
            reject(Error)
        }
        if (member.roles.some(x => x.id === roleR)) {
            message.reply({
                embed: {
                    description: ':eyes: Eu vejo que o usuário ja levou esta advertência!',
                    color: 6066491
                }
            })
            reject(Error)
        }
        resolve(true)
    })
}

const infoUser = (message, member, opcao, RichEmbed, tempo, reason) => {
    const embedAdv = new RichEmbed()
        .setAuthor(" | Advertência", member.user.avatarURL)
        .setFooter(`${message.guild.name}`, `${message.guild.avatarURL}`)
        .setTimestamp()
        .setColor(0xff0000)
    if (opcao) {
        embedAdv.setDescription(`**Caro ${member.user.username}, você acabou de tomar uma ` +
            `advertência no servidor \`\`${message.guild.name}\`\`**`)
        embedAdv.setThumbnail("http://2.bp.blogspot.com/--UrzBjXkHGc/Ta95OZfqrUI/AAAAAAAAA7Y/_Y4ZUB4jNkk/s1600/simpsons_nelson_haha2.jpg")
        embedAdv.addField("**Motivo**", `\`\`${reason ? reason : 'motivo não informado'}\`\``)
        embedAdv.addField("**Tempo**", `\`\`${tempo}\`\``)
    }
    else {
        embedAdv.setDescription(`\`\`Depois de muito tempo esperando sua Advertência acabou ` +
            `pode voltar ao servidor e usar os canais\`\``)
    }
    member.send(embedAdv)
}

const infoGuild = (message, member, tempo, roleA, reason, config, RichEmbed) => {
    let roleAdd = message.guild.roles.get(roleA)
    const embedAdv = new RichEmbed()
        .setTitle("Advertência")
        .setDescription(`<@${member.user.id}> tomou ${roleAdd}`)
        .setThumbnail("http://2.bp.blogspot.com/--UrzBjXkHGc/Ta95OZfqrUI/AAAAAAAAA7Y/_Y4ZUB4jNkk/s1600/simpsons_nelson_haha2.jpg")
        .addField("**Motivo**", `\`\`${reason ? reason : 'motivo não informado'}\`\``)
        .addField("**Tempo**", `\`\`${tempo}\`\``)
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`)
        .setTimestamp()
        .setColor(0xff0000)
    let canal = message.guild.channels.get(config.channelAdv)
    if (canal) return canal.send(embedAdv)
    message.channel.send(embedAdv)
}