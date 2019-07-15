'use strict'
const moment = require('moment');

const User = use('App/Models/User')
const Payable = use('App/Models/Payable')
const Fee = use('App/Models/Fee')
const Factory = use('Factory')

class UserSeeder {
  async run () {
    try {
      const user1 = new User()
      user1.username = 'teste1'
      user1.email = 'teste1@teste.com'
      user1.password = 'mudar12345'

      await user1.save()
      for (let index = 0; index < 5; index++) {
        const transaction = await Factory.model('App/Models/Transaction').create()
        const fee = await Fee.findBy("payment_method", transaction.payment_method)
        const payable = new Payable()
        let days = transaction.payment_method == "debit_card" ? 0 : 30
        let payment_date = moment(new Date(transaction.created_at)).add(days,'days').format("YYYY-MM-DD HH:mm:ss").toString()
        payable.status = transaction.payment_method == "debit_card" ? "paid" : "waiting_funds"  
        payable.payment_date = payment_date
        payable.fee = fee.value
        await transaction.payable().save(payable)
        await user1.transactions().save(transaction)
      }

      const user2 = new User()
      user2.username = 'teste2'
      user2.email = 'teste2@teste.com'
      user2.password = 'qwe123'

      await user2.save()

      for (let index = 0; index < 5; index++) {
        const transaction = await Factory.model('App/Models/Transaction').create()
        const fee = await Fee.findBy("payment_method", transaction.payment_method)
        const payable = new Payable()
        let days = transaction.payment_method == "debit_card" ? 0 : 30
        let payment_date = moment(new Date(transaction.created_at)).add(days,'days').format("YYYY-MM-DD HH:mm:ss").toString()
        payable.status = transaction.payment_method == "debit_card" ? "paid" : "waiting_funds"  
        payable.payment_date = payment_date
        payable.fee = fee.value
        await transaction.payable().save(payable)
        await user2.transactions().save(transaction)
      }
    } catch (error) {
      console.dir(error)
    }
  }
}

module.exports = UserSeeder
