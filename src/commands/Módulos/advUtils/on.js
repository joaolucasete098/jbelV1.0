/* eslint-disable no-undef */
const Adv = getmodule('controllers/Adv')
var rolesID = new Array()
module.exports = (client, message, args, RichEmbed, guild, config) => {
    if (config.Adv)
        return message.reply("Advertência ja está ativa no servidor")
    const adv = new Adv(client.datasource, message.guild.id)
    adv.getAll().then(async config => {
        if (!config.status) {
            let msg = await message.channel.send(`${client.getEmoji('547879973214617630')} \`\`Aguarde, criando os cargos necessários e configurando os canais\`\``)
            await salvarRole(message, adv)
            await permCalls(message.guild, rolesID).catch(err => console.log(err))
            msg.edit(`\`\`Por favor agora coloque os cargos criados acima de cargos de registro paras as configurações de permissão funcionarem\`\``)
                .catch(() => { })
        }
        guild.updateElement({ Adv: true }).then(() => {
            let embed = new RichEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL)
                .setDescription(`**Advertência foi ativada no servidor!**`)
                .setColor("4959E9")
                .setFooter(message.guild.name, message.guild.iconURL)
                .setTimestamp();
            message.channel.send(embed).catch(() => { })
        })
    })
}

const salvarRole = (message, adv) => {
    return new Promise((resolve, reject) => {
        if (message.guild.roles.size > 244)
            return message.reply(`Você precisa ter espaço para criar 6 tags, ` +
                `apague algumas ou não ative a advertência`)
        let rolesCriar = ['advertência 1', 'advertido 1 vez', "advertência 2",
            "Advertido 2 vezes", "advertência 3", "Advertido 3 vezes"]
        let color = 0xff0000
        for (let i = 0; i < rolesCriar.length; i++) {
            let name = rolesCriar[i]
            Promise.resolve(message.guild.createRole({ name, color, permissions: 0, mentionable: true })
                .then(r => {
                    rolesID.push(r.id)
                    adv.updateElement({ [i]: r.id })
                    if (i == 5) resolve()
                }).catch(err => reject(err)))
        }
        adv.updateElement({ status: true }).catch(err => reject(err))
    })
}

const permCalls = (guild, rolesID) => {
    return new Promise((resolve, reject) => {
        let canais = guild.channels.array()
        for (let j = 0; j < rolesID.length; j += 2) {
            for (let i = 0; i < canais.length; i++) {
                if (canais[i].type === 'voice') {
                    canais[i].overwritePermissions(rolesID[j], {
                        CONNECT: false,
                        SPEAK: false,
                        VIEW_CHANNEL: false
                    }).catch(err => reject(err))
                }
                else {
                    canais[i].overwritePermissions(rolesID[j], {
                        SEND_MESSAGES: false
                    }).catch(err => reject(err))
                }
            }
        }
        resolve()
    })
}