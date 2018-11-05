const fs = require('fs')

class User {
    constructor(user) {
        const { id, name, surname, username, password, postits } = user

        this.id = id || Date.now()

        this.name = name
        this.surname = surname
        this.username = username
        this.password = password

        this.postits = postits || []
    }

    save() {
        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)

                const index = users.findIndex(user => user.id === this.id)

                if (index < 0) users.push(this)
                else users[index] = this

                json = JSON.stringify(users)

                fs.writeFile(User._file, json, (err) => {
                    if (err) return reject(err)

                    resolve()
                })
            })
        })
    }

    toObject() {
        const { name, surname, username, password, postits } = this

        return { name, surname, username, password, postits }
    }

    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)

                const user = users.find(user => user.username === username)

                resolve(user ? new User(user) : undefined)
            })
        })
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)

                const user = users.find(user => user.id === id)

                resolve(user ? new User(user) : undefined)
            })
        })
    }

    savePostit(postit) {

        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)

                const index = users.findIndex(user => user.id === this.id)
                
                if (index < 0) return reject(err)
                
                else users[index].postits.push(postit)

                json = JSON.stringify(users)

                fs.writeFile(User._file, json, (err) => {
                    if (err) return reject(err)

                    resolve()
                })
            })
        })

    }

    killPostit(postitId) {
        return new Promise((resolve, reject) => {
            fs.readFile(User._file, (err, json) => {
                if (err) return reject(err)

                const users = JSON.parse(json)
                debugger
                const index = users.findIndex(user => user.id === this.id)
                
                if (index < 0) return reject(err)
                
                else users[index].postits = users[index].postits.filter(postit => postit.id !== Number(postitId))

                json = JSON.stringify(users)

                fs.writeFile(User._file, json, (err) => {
                    if (err) return reject(err)

                    resolve()
                })
            })
        })


    }

}

User._file = './data/users.json'

module.exports = User