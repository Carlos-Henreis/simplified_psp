'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PayablesSchema extends Schema {
  up () {
    this.create('payables', (table) => {
      table.increments()
      table.integer('user_id')
           .unsigned()
           .references('id')
           .inTable('users')
           .onUpdate('CASCADE')
           .onDelete('CASCADE')
      table.integer('transaction_id')
           .unsigned()
           .references('id')
           .inTable('transactions')
           .onUpdate('CASCADE')
           .onDelete('CASCADE')
      table.enu('status', ['paid', 'waiting_funds']).notNullable()
      table.date('payment_date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('payables')
  }
}

module.exports = PayablesSchema
