/* eslint-disable no-undef */
const Registro_Config = getmodule('controllers/Registro_Config')
module.exports = (client, message, args, RichEmbed, prefix, retry = 0) => {
    if (retry > 1) return 0;
    if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
        message.reply("O comando está disponível apenas para usuários STAFF.");
        return 0;
    }
    const registro_config = new Registro_Config(client.datasource, message.guild.id)
    registro_config.getAllRegister().then(registradores => {
        registro_config.getAllConfigGuild().then(config => {
            if (!registradores[`${message.author.id}`]) {
                registro_config.cadastreRegistrador(message.author.id)
                setTimeout(() => client.commands.registrar(client, message, args, RichEmbed, prefix, ++retry), 500);
                return 1;
            }
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!member) {
                message.reply("Mencione o usuário que deseja registrar!");
                return 0;
            }
            let hit = Object.keys(registradores[`${message.author.id}`].membrosRegistrados).includes(member.id);
            if (hit) {
                message.reply("Usuário já registrado");
                return 0;
            }
            let masculino = message.guild.roles.get(config.masculino);
            let feminino = message.guild.roles.get(config.feminino);
            let naoBinario = message.guild.roles.get(config.naoBinario);
            if (!masculino || !feminino || !naoBinario) {
                message.reply(`O comando não foi configurado, para ter mais informações digite ${prefix}config`);
                return 0;
            }
            let masculinoCheck = member.roles.get(masculino.id);
            let femininoCheck = member.roles.get(feminino.id);
            let naoBinarioCheck = member.roles.get(naoBinario.id);
            if (masculinoCheck && femininoCheck && naoBinarioCheck) {
                message.reply("O usuário possui os cargos `feminino` e `masculino`, remova um e tente novamente");
                return 0;
            }
            if (!masculinoCheck && !femininoCheck && !naoBinarioCheck) {
                message.reply(`**Registro incompleto!** Verifique se o mesmo possui a tag \`masculino\`, \`feminino\` ou \`não binário\` em seu registro.`);
                return 0;
            }
            if (masculinoCheck) gender = 'M'
            else if (femininoCheck) gender = 'F'
            else gender = 'NB'
            registro_config.updateElementRegister(message.author.id, 'membrosRegistrados', {
                [member.id]: {
                    genero: gender,
                    timestamp: message.createdTimestamp
                }
            }).then(() => {
                let novatoRole = message.guild.roles.get(config.novato);
                if (novatoRole) {
                    member.removeRole(novatoRole.id, "registro").catch(() => { });
                }
                client.registroUtils.canal(client, message, config, member, RichEmbed)
                let embedSv = new RichEmbed()
                    .setAuthor(`Registrador: ${message.author.username}`, message.author.displayAvatarURL)
                    .setDescription(`${message.author} você registrou o usuário ${member} com sucesso.`)
                    .setColor("#f8f403");
                message.channel.send(embedSv);
                let embedDM1 = new RichEmbed()
                    .setTitle(`**Registrado(a) no Servidor: ${member.guild.name}**`)
                    .setDescription(`**Você foi registrado(a) por ${message.author}**\n` +
                        `\`\`\`js\n${member.roles.map(roles => `${roles.id === message.guild.id ? "Agora possui as tags:" : roles.name}`).join('\n')}\`\`\``)
                    .setThumbnail(message.author.displayAvatarURL)
                    .setColor("#f8f403");
                member.send(embedDM1);
            });
        })
    })
}