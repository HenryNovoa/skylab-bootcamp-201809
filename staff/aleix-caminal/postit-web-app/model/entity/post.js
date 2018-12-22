const { Entity } = require('lilli')

class Post extends Entity {
    constructor(query) {
        super(query)

        this.id = query.id || Date.now()
        this.title = query.title
        this.boardId = query.boardId
    }
}

module.exports = Post
