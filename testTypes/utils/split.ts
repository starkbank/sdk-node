import starkbank from 'starkbank';
const generateExampleInvoicesJson = require('./invoice.js').generateExampleInvoicesJson;

exports.generateExampleSplittedInvoices = async function (n: number) {
    let receivers_length = 2;
    let splitReceivers = await starkbank.splitReceiver.query({limit: receivers_length});

    let invoices = generateExampleInvoicesJson(n);
    let invoicesList = [];

    for (let invoice of invoices) {
        invoice.discounts = [];
        let splits = [];
        for await (let receiver of splitReceivers) {
            splits.push(new starkbank.Split({
                amount: 100,
                receiverId: receiver.id
            }));
        }
        invoice.splits = splits;
        invoicesList.push(new starkbank.Invoice(invoice));
    }

    let createdInvoices = await starkbank.invoice.create(invoicesList);

    return createdInvoices;
}

exports.paySplittedInvoices = async function (invoices: starkbank.Invoice[]) {
    let payments = [];
    for (let invoice of invoices) {
        payments.push(new starkbank.BrcodePayment({
            brcode: invoice.brcode,
            taxId: "20.018.183/0001-80",
            description: "Split test",
        }));
    }
    let createdPayments = await starkbank.brcodePayment.create(payments);
    return createdPayments;
}
