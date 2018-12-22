'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostitSchema extends Schema {
  up () {
    this.create('postits', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('content', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('postits')
  }
}

module.exports = PostitSchema
