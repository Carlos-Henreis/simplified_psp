'use strict'
const moment = require('moment');

const Transaction = use('App/Models/Transaction')
const Payable = use('App/Models/Payable')
const Fee = use('App/Models/Fee')

class TransactionController {
  async index ({ auth }) {
    let transactions = await Transaction
      .query()
      .where("user_id", "=", auth.user.id)
      .with('payable')
      .fetch()

    return transactions
  }
  
  async show ({ params, auth, response }) {

    const transaction = await Transaction.findOrFail(params.id)

    if (transaction.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await transaction.load("payable")
    return transaction
  }

  async store ({ auth, request, response }) {
    const id_user = auth.user.id
    const data = request.only([
      'value',
      'description',
      'payment_method',
      'card_number',
      'card_holder',
      'card_expiration_date',
      'cvv'
    ])

    if (/\d{14}|\d{15}|\d{16}/.test(data.card_number) == false) {
      return response.status(400).send({ error: 'invalid card format' })
    }

    const transaction = await Transaction.create({ ...data, user_id: id_user })
   
    const fee = await Fee.findBy("payment_method", data.payment_method)
    const payable = new Payable()
    let days = data.payment_method == "debit_card" ? 0 : 30
    let payment_date = moment(new Date(transaction.created_at)).add(days,'days').format("YYYY-MM-DD HH:mm:ss").toString()
    payable.status = data.payment_method == "debit_card" ? "paid" : "waiting_funds"  
    payable.payment_date = payment_date
    payable.fee = fee.value

    await transaction.payable().save(payable)


    return transaction
  }

}

module.exports = TransactionController
