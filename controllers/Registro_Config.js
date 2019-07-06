
module.exports = class serverLogs {
    constructor(db, guildId) {
        this.pathRegistro = db.ref().child(`Guilds`)
            .child(guildId)
            .child('Registros')
            .child('registradores')
        this.pathConfigGuild = db.ref().child(`Guilds`)
            .child(guildId)
            .child('Modulos')
            .child('ConfigGuild')
    }
    cadastreRegistrador(id) {
        return new Promise((resolve, reject) => {
            this.pathRegistro
                .set({
                    [id]: {
                        'membrosRegistrados': ''
                    }
                })
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
    getAllRegister() {
        return new Promise((resolve, reject) => {
            this.pathRegistro
                .once('value', (snapshot) => {
                    if (snapshot.exists()) resolve(snapshot.val())
                    else reject('erro registro_config')
                })
        })
    }

    updateElementRegister(registrador, local, data) {
        return new Promise((resolve, reject) => {
            this.pathRegistro.child(registrador)
                .child(local)
                .update(data)
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
    getAllConfigGuild() {
        return new Promise((resolve, reject) => {
            this.pathConfigGuild
                .once('value', (snapshot) => {
                    if (snapshot.exists()) resolve(snapshot.val())
                    else reject('erro registro_config')
                })
        })
    }

    updateElementConfigGuild(data) {
        return new Promise((resolve, reject) => {
            this.pathConfigGuild.update(data)
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
}