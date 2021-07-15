const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleInvoicesJson = require('./utils/invoice.js').generateExampleInvoicesJson;
const random = require('./utils/random');

starkbank.user = require('./utils/user').exampleProject;

describe('TestInvoicePost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let invoices = generateExampleInvoicesJson(5);
        invoices = await starkbank.invoice.create(invoices);
        for (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
        }
    });
});

describe('TestInvoiceGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const invoices = await starkbank.invoice.query({limit: 5});
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestInvoiceInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let invoices = await starkbank.invoice.query({limit: 5});
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            invoice = await starkbank.invoice.get(invoice.id);
            assert(typeof invoice.id == 'string');
        }
    });
});

describe('TestInvoiceInfoPatch', function(){
    this.timeout(20000);
    it('test_success_cancel', async () => {
        let invoices = await starkbank.invoice.query({status: "created", limit: 1});
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            let updated_invoice = await starkbank.invoice.update(invoice.id, {status: "canceled"});
            assert(updated_invoice.status == 'canceled');
        }
    });

    it('test_success_amount', async () => {
        let invoices = await starkbank.invoice.query({status: "created", limit: 1});
        let invoice_amount = 4321;
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            let updated_invoice = await starkbank.invoice.update(invoice.id, {amount: invoice_amount});
            assert(updated_invoice.amount == invoice_amount);
        }
    });

    it('test_success_due', async () => {
        let invoices = await starkbank.invoice.query({status: "created", limit: 1});
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            let updated_invoice = await starkbank.invoice.update(invoice.id, {due: random.futureDateTime(7)});
            assert(updated_invoice.due != invoice.due);
        }
    });

    it('test_success_expiration', async () => {
        let invoices = await starkbank.invoice.query({status: "created", limit: 1});
        let invoice_expiration = 123456789;
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            let updated_invoice = await starkbank.invoice.update(invoice.id, {expiration: invoice_expiration});
            assert(updated_invoice.expiration === invoice_expiration);
        }
    });
});

describe('TestInvoiceQrcodeGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let invoices = await starkbank.invoice.query({limit: 1});
        for await (let invoice of invoices) {
            let invoiceId = invoice.id;
            let qrcode = await starkbank.invoice.qrcode(invoiceId);
            assert(qrcode.length, 1000);
            let bigQrcode = await starkbank.invoice.qrcode(invoiceId, {size: 25});
            assert(bigQrcode.length, 1000);
        }
    });
});

describe('TestInvoicePdfGet', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let invoices = await starkbank.invoice.query({limit: 1});
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            let pdf = await starkbank.invoice.pdf(invoice.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestInvoicePaymentGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let invoices = await starkbank.invoice.query({status: "paid", limit: 1});
        for await (let invoice of invoices) {
            let payment = await starkbank.invoice.payment(invoice.id);
            assert(typeof payment == 'object');
        }
    })
})
