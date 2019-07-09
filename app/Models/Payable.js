'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Payable extends Model {

  /**
   * A relationship in the transaction is necessary
   * to create the customer receivables. From resources like
   * `Transaction value` or` Payment method` will be saved
   * within the transactions table (entity of 1-1 relationship).
   *
   * @method transaction
   *
   * @return {Object}
   */
   user () {
    return this.belongsTo('App/Models/User')
  }

  transaction(){
    return this.hasOne('App/Models/Transaction','id','transaction_id');
  }
}

module.exports = Payable
