const { Table } = require('lilli')

class UsersTable extends Table {
    constructor() {
        super('users')
        this.hasMany('boards', {
            foreignKey: 'userId'
        })
    }
}

module.exports = UsersTable
