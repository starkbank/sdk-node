const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleBoletoPaymentsJson = require('./utils/boletoPayment.js').generateExampleBoletoPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestBoletoPaymentPost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleBoletoPaymentsJson(5);
        payments = await starkbank.boletoPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestBoletoPaymentGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.boletoPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestBoletoPaymentPostAndDelete', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleBoletoPaymentsJson(1);
        payments = await starkbank.boletoPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.boletoPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestBoletoPaymentInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.boletoPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.boletoPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestBoletoPaymentPdfGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.boletoPayment.query({limit: 1, status: ['processing']});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.boletoPayment.pdf(payment.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});


describe('TestBoletoPaymentGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.boletoPayment.page({ limit: 5, cursor: cursor });
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
