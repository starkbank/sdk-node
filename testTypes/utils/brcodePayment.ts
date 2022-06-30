import starkbank from "starkbank";
const generateExampleInvoicesJson = require('./invoice.js').generateExampleInvoicesJson;
const random = require('./random.js');

export async function generateExampleBrcodePaymentsJson(n: number, nextDay = false) {

    let exampleBrcodePayment = {
        brcode: "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A",
        taxId: '20.018.183/0001-80',
        description: "Tony Stark's Suit",
        amount: 7654321,
        scheduled: '2020-02-29',
        tags: ['Stark', 'Suit']
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
        exampleBrcodePayment.scheduled = nextDayDateTime < invoiceDueDateTime ? nextDayDateTime : invoiceDueDateTime;

        payments.push(new starkbank.BrcodePayment(exampleBrcodePayment));
    }
    return payments;
};
