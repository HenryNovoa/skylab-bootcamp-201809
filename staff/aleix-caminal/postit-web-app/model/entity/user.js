const { sha256 } = require('js-sha256')
const { Entity } = require('lilli')

class User extends Entity {
    constructor(query) {
        super(query)

        this.id = query.id || Date.now()
        this.username = query.username
        this.password = sha256(query.password)
        this.name = query.name
    }
}

module.exports = User
