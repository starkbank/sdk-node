const starkbank = require('starkbank');
const random = require('./random.js');

exports.generateExampleInvoicesJson = function (n, amount = null, useRandomFutureDueDate = true) {

    let exampleInvoice = {
        amount: 400000,
        due: random.futureDateTime(200),
        taxId: '012.345.678-90',
        name: 'Iron Bank S.A.',
        expiration: 123456789,
        fine: 2.5,
        interest: 1.3,
        discounts: [
            {
                'percentage': 10,
                'due': random.futureDateTime(100)
            }
        ],
        tags: [
                'War supply',
                'Invoice #1234'
        ],
        descriptions: [
            {
                'key': 'Field1',
                'value': 'Something'
            }
        ],
    };

    let invoices = [];
    for (let i = 0; i < n; i++) {
        exampleInvoice.name = 'Jon Snow';
        exampleInvoice.amount = random.randomInt(200, 1000);
        if (useRandomFutureDueDate) {
            for (let discount of exampleInvoice.discounts) {
                discount["due"] = random.randomDatetimeBetween(new Date(), exampleInvoice.due);
            }
        }
        invoices.push(new starkbank.Invoice(exampleInvoice));
    }
    return invoices;
};
