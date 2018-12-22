'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 20).notNullable()
      table.string('surname', 50).notNullable()
      table.string('phone', 20).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('username', 20).notNullable().unique()
      table.string('password', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
