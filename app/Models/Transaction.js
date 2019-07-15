'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
     this.addHook('beforeSave', async (transactionInstance) => {
         transactionInstance.card_number = transactionInstance.card_number.replace(/^(\d+)(\d{4})$/, "*********$2")
     })
  }

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
   user () {
    return this.belongsTo('App/Models/User')
  }

  payable(){
    return this.hasOne('App/Models/Payable', "id", "transaction_id");
  }
}

module.exports = Transaction
