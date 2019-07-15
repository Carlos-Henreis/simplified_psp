'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('user_id')
           .unsigned()
           .references('id')
           .inTable('users')
           .onUpdate('CASCADE')
           .onDelete('CASCADE')
      table.decimal('value').notNullable()
      table.string('description').notNullable()
      table.enu('payment_method', ['debit_card', 'credit_card']).notNullable()
      table.string('card_number').notNullable()
      table.string('card_holder').notNullable()
      table.string('card_expiration_date').notNullable()
      table.integer('cvv').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.table('transactions', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TransactionsSchema
