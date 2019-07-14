'use strict'
const moment = require('moment');

const Transaction = use('App/Models/Transaction')
const Payable = use('App/Models/Payable')
const Fee = use('App/Models/Fee')

class BalanceController {
    async index ({ auth, response }) {
        const transactions = await Transaction
          .query()
          .where("user_id", "=", auth.user.id)
          .with('payable')
          .fetch()
        
        let available = 0
        let waiting_funds = 0

        
        transactions.toJSON().forEach(transaction => {
            if (transaction.payable.status == "paid") {
                available += (transaction.value) * (1 - transaction.payable.fee)
            } else if (transaction.payable.status == "waiting_funds") {
                waiting_funds += (transaction.value) * (1 - transaction.payable.fee)
            }
        });
    
        return response.status(200).send({ available: available, waiting_funds: waiting_funds }) 
    }
}

module.exports = BalanceController
