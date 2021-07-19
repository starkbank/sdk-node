const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleTaxPaymentsJson = require('./utils/taxPayment').generateExampleTaxPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;


describe('TestTaxPaymentPost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleTaxPaymentsJson(5);
        payments = await starkbank.taxPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestTaxPaymentGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.taxPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestTaxPaymentPostAndDelete', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleTaxPaymentsJson(1);
        payments = await starkbank.taxPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.taxPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestTaxPaymentInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.taxPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.taxPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestTaxPaymentPdfGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.taxPayment.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.taxPayment.pdf(payment.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestTaxPaymentGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.taxPayment.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length == 10);
    });
});
