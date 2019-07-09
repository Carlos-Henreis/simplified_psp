'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {

  /**
   * A relationship in the payable is necessary
   * to create the customer receivables. From resources like
   * `payment date` or `status payable` will be saved
   * within the transactions table (entity of 1-1 relationship).
   *
   * @method payable
   *
   * @return {Object}
   */
   payable() {
     return this.hasMany('App/Models/Payable');
   }
}

module.exports = Transaction
