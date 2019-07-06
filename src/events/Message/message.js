/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint no-console: [" error", { allow: ["warn", "error", "log"]}] */
'use strict'
var { ownerID, prefix } = require('config.json')
const { RichEmbed } = require('discord.js')
const Prefix = getmodule('controllers/Prefix')
const ConfigGuild = getmodule('controllers/ConfigGuild')
const cooldown = new Set()
module.exports = async (client, message) => {
    if (!message.guild) return
    if (message.author.bot) return
    if (message.channel.type == "dm") return
    if (client.user.presence.status === 'offline' && message.author.id !== client.owner().id) return
    const prefixo = new Prefix(client.datasource, message.guild.id)
    const config = new ConfigGuild(client.datasource, message.guild.id)
    prefixo.getElement('prefix').then(guildTable => {
        config.getElement('filtroInvites').then(filtroInvites => {
            if (!guildTable) return
            if (guildTable) prefix = guildTable
            if (filtroInvites) worstFiltro(client, message);
            if (message.content.includes(`<@${client.user.id}>`))
                return message.reply(`Meu prefixo é **\`\`${prefix}\`\`** | ` +
                    `Use: ${prefix}prefixo <prefixo> para alterar!`)

            if (!message.content.startsWith(prefix)) return
            if (cooldown.has(message.author.id) && message.author.id !== ownerID)
                return message.reply("Aguarde 2.5s para usar os comandos novamente");

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            const cmd = client.commands[command];
            if (cmd) cmd(client, message, args, RichEmbed, prefix);
            cooldown.add(message.author.id)
            timeUser(message.author.id)
            message.delete().catch(() => { })
        })
    })
}

const timeUser = (user_id) => setTimeout(() => cooldown.delete(user_id), 1000 * 2.5)
const worstFiltro = async (client, message) => {
    if (!/discord\.gg\/[\d\w]/.test(message.content)) return;
    message.reply(`${client.getEmoji("6445_ModWarning")} Você não pode enviar convites de outros servidores aqui!`);
    message.delete().catch(() => { });
}