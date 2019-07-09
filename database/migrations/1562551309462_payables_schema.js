'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PayablesSchema extends Schema {
  up () {
    this.create('payables', (table) => {
      table.increments()
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
