'use strict'
const Factory = use('Factory')

Factory.blueprint('App/Models/Transaction', async (faker) => {
    return {
        value: faker.floating({ min: 0, max: 99999, fixed: 2 }),
        description: faker.sentence({ words: 5 }),
        payment_method: ["credit_card", "debit_card"][Math.floor(Math.random()*2)],
        card_number: faker.cc(),
        card_holder: faker.name({ middle_initial: true }),
        card_expiration_date: faker.exp(),
        cvv: faker.integer({ min: 100, max: 999 })
    }
})