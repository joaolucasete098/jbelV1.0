
module.exports = class serverLogs {
    constructor(db, guildId) {
        this.path = db.ref().child(`Guilds`)
            .child(guildId)
            .child('Modulos')
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
                .once('value', (snapshot) => {
                    resolve(snapshot.val())
                })
        })
    }

    getElement(data) {
        return new Promise((resolve, reject) => {
            this.path.get()
                .once('value', snapshot => {
                    if (snapshot.exists()) resolve(snapshot.val()[data])
                    else reject('erro guild all')
                })
        })
    }
    updateElement(data) {
        return new Promise((resolve, reject) => {
            this.path.update(data)
                .then(resolve(true))
                .catch(err => reject(err))
        })
    }
}