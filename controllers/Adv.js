
module.exports = class serverLogs {
    constructor(db, guildId) {
        this.path = db.ref().child(`Guilds`)
            .child(guildId)
            .child('Modulos')
            .child('Adv')
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.path
                .set(data)
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
    deletar(local) {
        return new Promise((resolve, reject) => {
            if (local) this.path.child(local).remove()
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.path
                .once('value', snapshot => {
                    if (snapshot.exists()) resolve(snapshot.val())
                    else reject('erro adv')
                })
        })
    }

    getElement(data) {
        return new Promise((resolve, reject) => {
            this.path
                .once('value', snapshot => {
                    if (snapshot.exists()) resolve(snapshot.val()[data])
                    else reject('erro adv')
                })
        })
    }
    updateElement(data, local) {
        return new Promise((resolve, reject) => {
            if (local) this.path.child(local).update(data)
                .then(resolve(true))
                .catch(err => reject(err))
            else this.path.update(data)
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
}