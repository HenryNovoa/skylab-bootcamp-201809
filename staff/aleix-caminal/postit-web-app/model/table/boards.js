const { Table } = require('lilli')

class BoardsTable extends Table {
    constructor() {
        super('boards')
        this.hasMany('posts', {
            foreignKey: 'boardId'
        })
        
        this.belongsTo('users', {
            foreignKey: 'userId'
        })
    }
}

module.exports = BoardsTable
