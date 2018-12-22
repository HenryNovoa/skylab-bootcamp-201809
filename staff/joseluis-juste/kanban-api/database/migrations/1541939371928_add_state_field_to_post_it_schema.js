'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddStateFieldToPostItSchema extends Schema {
  up () {
    this.alter('postits', (table) => {
      table.string('state', 15).notNullable()
    })
  }

  down () {
    this.alter('postits', (table) => {
        table.dropColumn("state")
    })
  }
}

module.exports = AddStateFieldToPostItSchema
