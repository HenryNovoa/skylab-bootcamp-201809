const { Table } = require('lilli')

class PostsTable extends Table {
    constructor() {
        super('posts')
        this.belongsTo('boards', {
            foreignKey: 'boardId'
        })
    }
}

module.exports = PostsTable
