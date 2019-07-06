/* eslint-disable no-undef */
'use strict'
const { RichEmbed } = require("discord.js");
const AntiRaid = getmodule('controllers/AntiRaid')
const Prefix = getmodule('controllers/Prefix')
const cooldown = new Set()
var cont = 0
module.exports = (client, banGuild) => {
  if (!banGuild.available) return;
  const antiraid = new AntiRaid(client.datasource, banGuild.id)
  const prefix = new Prefix(client.datasource, banGuild.id)
  /**
   * `guildTable.punishment`
   * `guildTable.qtd`
   * `guildTable.time`
   */
  antiraid.getAll().then(async guildTable => {
    if (cooldown.has(banGuild.id)) cont++
    else {
      cooldown.add(banGuild.id)
      cont = 1
      timeUser(banGuild.id, guildTable.time)
    }
    if (cont >= guildTable.qtd) {
      const rol = banGuild.roles
      rol.forEach(r => {
        if (r.hasPermission('BAN_MEMBERS')) {
          antiraid.updateElement({ [r.id]: r.permissions }, 'roles')
          r.edit({ permissions: 0 }).catch(() => { })
        }
        cont = 0
      });
      prefix.getElement('prefix').then(prefix => {
        let embed = new RichEmbed()
          .setAuthor(' | Ataque', banGuild.iconURL)
          .setDescription(`Seu servidor acabou de sofrer um ataque e ` +
            `todos os cargos perderam suas permissões, para voltar as permissões. ` +
            `**Use:** \`\`${prefix}antiraid cargos\`\``)
          .setColor("RED")
          .setFooter(client.owner().user.username, client.owner().user.avatarURL)
          .setTimestamp();
        banGuild.owner.send(embed)
      })
    }
  })
}

const timeUser = (user_id, time) => setTimeout(() => {
  cooldown.delete(user_id)
  cont = 0
}, 1000 * 60 * time)