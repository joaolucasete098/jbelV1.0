
module.exports = class serverLogs {
    constructor(db, guildId) {
        this.path = db.ref().child('Guilds')
            .child(guildId)
            .child('Registros')
            .child('registradores')
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.path
                .set(data)
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.path
                .once('value', snapshot => {
                    if (snapshot.exists()) resolve(snapshot.val())
                    else reject('erro registro')
                })
        })
    }
    deletar() {
        return new Promise((resolve, reject) => {
            this.path.set({ 'membrosRegistrados': '' })
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
    getElement(local, data) {
        return new Promise((resolve, reject) => {
            this.path.child(local)
                .once('value', snapshot => {
                    if (snapshot.exists()) resolve(snapshot.val()[data])
                    else reject('erro registro')
                })
        })
    }
    updateElement(campo, data) {
        return new Promise((resolve, reject) => {
            this.path.child(campo).update(data)
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
}