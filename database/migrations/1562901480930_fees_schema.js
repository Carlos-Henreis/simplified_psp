'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeesSchema extends Schema {
  up () {
    this.create('fees', (table) => {
      table.increments()
      table.decimal('value').notNullable()
      table.enu('payment_method', ['debit_card', 'credit_card']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('fees')
  }
}

module.exports = FeesSchema
