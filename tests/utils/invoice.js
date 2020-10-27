const starkbank = require('../../index.js');
const { date } = require('../../sdk/utils/check.js');
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
                'due': '2020-11-25T17:59:26.249976+00:00'
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
        let invoiceAmount = Math.floor(exampleInvoice.amount);
        if (!invoiceAmount) {
            invoiceAmount = random.randomInt(200, 1000);
        }
        exampleInvoice.name = 'Jon Snow';
        exampleInvoice.amount = invoiceAmount;
        if (useRandomFutureDueDate) {
            for (let discount of exampleInvoice.discounts) {
                discount["due"] = random.randomDatetimeBetween(new Date(), exampleInvoice.due);
            }
        }
        invoices.push(new starkbank.Invoice(exampleInvoice));
    }
    return invoices;
};
