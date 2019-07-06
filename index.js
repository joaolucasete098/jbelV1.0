/* eslint-disable no-undef */
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();
require('getmodule')

const config = require('./config/database')
const datasource = require('./config/datasource')
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
var source = fs.readdirSync("./src");
client.queue = new Map()
const { token } = require('config.json')

const moment = require('moment')
moment.locale('pt-br')
client.getData = () => moment(new Date()).format('LL')

const { ownerGuild, ownerID } = require('config.json')
client.owner = () => { return client.guilds.get(ownerGuild).members.get(ownerID) }
client.delTime = 5000
client.getEmoji = emoji => client.emojis.find(e => e.name === emoji);
/** 
* `Instânciando o banco no` @object `client`
*/
client.config = config
client.datasource = datasource(client)

isDir = path => {
    try {
        let stat = fs.lstatSync(path)
        return stat.isDirectory()
    } catch (err) {
        return false;
    }
}

source.forEach(folder => {
    if (folder === 'commands') {
        client[folder] = {};
    } else if (folder !== 'events') return
    let subFolder = fs.readdirSync(`./src/${folder}`)
    subFolder.forEach(subFolder => {
        let all = fs.readdirSync(`./src/${folder}/${subFolder}`)
        let files = all.filter(f => {
            let dirCheck = isDir(`./src/${folder}/${subFolder}/${f}`)
            return f.endsWith('.js') && !dirCheck
        })
        files.forEach(file => {
            let name = file.split('.')[0]
            let exported = require(`./src/${folder}/${subFolder}/${file}`)
            if (folder === "events") {
                client.on(name, exported.bind(null, client))
            }
            else
                client[folder][name] = exported
            delete require.cache[require.resolve(`./src/${folder}/${subFolder}/${file}`)]
        })
        let subFilesFolders = all.filter(f => isDir(`./src/${folder}/${subFolder}/${f}`))
        subFilesFolders.forEach(subFilesFolders => {
            client[subFilesFolders] = {}
            let subFiles = fs.readdirSync(`./src/${folder}/${subFolder}/${subFilesFolders}`)
            subFiles.forEach(subFile => {
                let name = subFile.split('.')[0]
                let exported = require(`./src/${folder}/${subFolder}/${subFilesFolders}/${subFile}`)
                client[subFilesFolders][name] = exported
                delete require.cache[require.resolve(`./src/${folder}/${subFolder}/${subFilesFolders}/${subFile}`)]
            })
        })
    })
})
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
client.login(token).catch(console.error)