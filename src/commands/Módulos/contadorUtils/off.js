module.exports = (client, message, args, prefix, guildTable, contador) => {
    if (contador._idChannel === "") {
        message.reply("Voce deve setar um canal primeiro");
        return 0;
    }
    if (contador.status === false) {
        message.reply(`O contador já está off`);
        return 0;
    }
    guildTable.updateElement({ status: false, _idChannel: "" })
    let oldChannel = contador._idChannel
    try {
        message.reply(`Status do contador setado para: off`);
        let canal = message.guild.channels.get(oldChannel);
        if (!canal) return;
        canal.setTopic("", "Removendo contador");
    } catch (error) {
        console.log(error);
        message.reply(`Erro`);
    }
};