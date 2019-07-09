'use strict'
const Transaction = use('App/Models/Transaction')

class TransactionController {
  async index () {
    const transactions = Transaction.all()

    return transactions
  }

  async show ({ params }) {
    const transaction = await Transaction.findOrFail(params.id)

    return transaction
  }

  async destroy ({ params, auth, response }) {
    const transaction = await Transaction.findOrFail(params.id)

    if (transaction.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await transaction.delete()
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

    if (/\d{14}/.test(data.card_number) == false) {
      return response.status(400).send({ error: 'invalid card format' })
    }

    const transaction = await Transaction.create({ ...data, user_id: id_user })

    return transaction
  }

  async update ({ params, request, response }) {
    const transaction = await Transaction.findOrFail(params.id)

    const data = request.only([
      'value',
      'description',
      'payment_method',
      'card_number',
      'card_holder',
      'card_expiration_date',
      'cvv'
    ])

    transaction.merge(data)

    await transaction.save()

    return transaction
  }
}

module.exports = TransactionController
