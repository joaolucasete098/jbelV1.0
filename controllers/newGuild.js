/* eslint-disable no-undef */
const { prefix } = require('config.json')
const imports = require('./imports')
const models = require('./importModels')
module.exports = {
    run: (client, guildId) => {
        const db = client.datasource
        const prefixo = new imports.Prefix(db, guildId)
        const serverlogs = new imports.ServerLogs(db, guildId)
        const welcome = new imports.Welcome(db, guildId)
        const contador = new imports.Contador(db, guildId)
        const configGuild = new imports.ConfigGuild(db, guildId)
        const antiRaid = new imports.AntiRaid(db, guildId)
        const registro = new imports.Registro(db, guildId)
        const adv = new imports.Adv(db, guildId)
        prefixo.create({ prefix })
        welcome.create(models.Welcome)
        serverlogs.create(models.ServerLogs)
        contador.create(models.Contador)
        antiRaid.create(models.AntiRaid)
        configGuild.create(models.ConfigGuild)
        registro.create('')
        adv.create(models.Adv)
    }
}
