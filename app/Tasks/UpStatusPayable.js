'use strict'
const moment = require('moment');

const Payable = use('App/Models/Payable')
const Task = use('Task')

class UpStatusPayable extends Task {
  static get schedule () {
    //Todo dia a meia noite
    return '0 0 * * *'
  }

  async handle () {
    await Payable
      .query()
      .where('status', 'waiting_funds')
      .andWhere('payment_date', '<', moment().format("YYYY-MM-DD HH:mm:ss"))
      .update({ status: 'paid' })
  }
}

module.exports = UpStatusPayable
