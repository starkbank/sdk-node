const starkbank = require('../../index.js');
const generateExampleInvoicesJson = require('./invoice.js').generateExampleInvoicesJson;

exports.generateExampleSplittedInvoices = async function (n = 1) {
    receivers_length = 2
    let splitReceivers = await starkbank.splitReceiver.query({limit: receivers_length});

    let invoices = generateExampleInvoicesJson(n);

    for (let invoice of invoices) {
        invoice.discounts = []
        let splits = [];
        for await (let receiver of splitReceivers) {
            splits.push(new starkbank.Split({
                amount: 100,
                receiverId: receiver.id
            }));
        }
        invoice.splits = splits;
    }

    let createdInvoices = await starkbank.invoice.create(invoices);

    return createdInvoices;
}

exports.paySplittedInvoices = async function (invoices) {
    let payments = [];
    for (let invoice of invoices) {
        let payment = {
            brcode: invoice.brcode,
            taxId: "20.018.183/0001-80",
            description: "Split test",
        }
        payments.push(new starkbank.BrcodePayment(payment));
    }
    let createdPayments = await starkbank.brcodePayment.create(payments);
    return createdPayments;
}
