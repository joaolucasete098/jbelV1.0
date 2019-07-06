module.exports = (client, message, args, RichEmbed, prefix, config) => {
    let msgFiltroInvites = config.filtroInvites ?
        `${client.getEmoji("onjbel")} Ativo | Use: ${prefix}config filtro off` :
        `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config filtro on`;
    let msgFiltroBots = config.filtroBots ?
        `${client.getEmoji("onjbel")} Ativo | Use: ${prefix}config bot off` :
        `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config bot on`;
    let embed = new RichEmbed()
        .setAuthor(message.author.username, message.author.displatAvatarURL)
        .setDescription(`Olá **${message.author.username}**, este e o painel de configurações do bot em seu servidor.`)
        .addField("Filtro de Convites:", msgFiltroInvites, false)
        .addField("Filtro de Bots:", msgFiltroBots, false)
        .setColor("4959E9")
        .setFooter(message.guild.name, message.guild.iconURL)
        .setTimestamp();
    if (message.guild.roles.get(config.masculino)) {
        embed.addField("Masculino", `${client.getEmoji("onjbel")} Ativo | Cargo masculino: <@&${config.masculino}>`, true);
    } else {
        embed.addField("Masculino", `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config masculino`, true);
    }
    if (message.guild.roles.get(config.feminino)) {
        embed.addField("Feminino", `${client.getEmoji("onjbel")} Ativo | Cargo feminino: <@&${config.feminino}>`, true);
    } else {
        embed.addField("Feminino", `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config feminino`, true);
    }
    if (message.guild.roles.get(config.naoBinario)) {
        embed.addField("Não Binário", `${client.getEmoji("onjbel")} Ativo | Cargo S-indefinido: <@&${config.naoBinario}>`, true);
    } else {
        embed.addField("Não Binário", `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config S-indefinido`, true);
    }
    if (message.guild.roles.get(config.novato)) {
        embed.addField("Novato", `${client.getEmoji("onjbel")} Ativo | Cargo novato: <@&${config.novato}>`);
    } else {
        embed.addField("Novato", `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config novato`);
    }
    if (message.guild.channels.get(config.channelRegister)) {
        embed.addField("Log de Registro", `${client.getEmoji("onjbel")} Ativo | canal log de registro: <#${config.channelRegister}> | ${prefix}config canal reg off`);
    } else {
        embed.addField("Log de Registro", `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config canal reg`);
    }
    if (message.guild.channels.get(config.channelAdv)) {
        embed.addField("Log de Advertência", `${client.getEmoji("onjbel")} Ativo | canal log de Advertências: <#${config.channelAdv}> | ${prefix}config canal adv off`);
    } else {
        embed.addField("Log de Advertência", `${client.getEmoji("offjbel")} Desativado | Use: ${prefix}config canal adv`);
    }
    message.channel.send(embed).catch(() => { });
};