import starkbank from "starkbank";
const generateExampleInvoicesJson = require('./invoice.js').generateExampleInvoicesJson;
const random = require('./random.js');

export async function generateExampleBrcodePaymentsJson(n: number, nextDay = false) {

    let exampleBrcodePayment = {
        brcode: "00020101021226890014br.gov.bcb.pix2567invoice-h.sandbox.starkbank.com/v2/db86835d61274c7799a1f637b2b6f8b652040000530398654040.005802BR5915Stark Bank S.A.6009Sao Paulo62070503***6304FCCE",
        taxId: '22.653.392/0001-20',
        description: "Tony Stark's Suit",
        amount: 7654321,
        rules: [
            new starkbank.brcodePayment.Rule({
                key: "resendingLimit",
                value: 2
            })
        ]
    };

    let payments = [];
    let invoices = generateExampleInvoicesJson(n=n);

    invoices = await starkbank.invoice.create(invoices);

    for await (let invoice of invoices) {
        exampleBrcodePayment.brcode = invoice.brcode;

        let previews = await starkbank.brcodePreview.query({brcodes: [invoice.brcode]});
        for await (let preview of previews) {
            exampleBrcodePayment.amount = preview.amount;
        }

        let nextDayDateTime = nextDay ? random.futureDateTime(1) : random.futureDateTime(300);
        let invoiceDueDateTime: string | Date = new Date(invoice.due);
        invoiceDueDateTime = new Date(invoiceDueDateTime.setHours(invoiceDueDateTime.getHours() - 3)).toISOString().replace('Z','+00:00');

        payments.push(new starkbank.BrcodePayment(exampleBrcodePayment));
    }
    return payments;
};
