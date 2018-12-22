const { Entity } = require('lilli')

class Board extends Entity {
    constructor(query) {
        super(query)

        this.id = query.id || Date.now()
        this.title = query.title
        this.userId = query.userId
    }
}

module.exports = Board
