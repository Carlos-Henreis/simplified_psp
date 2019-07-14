'use strict'
const Fee = use('App/Models/Fee')


class FeeSeeder {
  async run () {
    const fee1 = new Fee()
    fee1.value = 0.03
    fee1.payment_method = 'debit_card'

    await fee1.save()

    const fee2 = new Fee()
    fee2.value = 0.05
    fee2.payment_method = 'credit_card'

    await fee2.save()
  }
}

module.exports = FeeSeeder
