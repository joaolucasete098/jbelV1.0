
module.exports = class serverLogs {
    constructor(db, guildId) {
        this.path = db.ref().child(`Guilds`).child(guildId)
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
                    else reject('erro prefix')
                })
        })
    }

    getElement(data) {
        return new Promise((resolve, reject) => {
            this.path
                .once('value', snapshot => {
                    if (snapshot.exists()) resolve(snapshot.val()[data])
                    else reject('erro prefix')
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