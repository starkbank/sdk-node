const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleDasPaymentsJson = require('./utils/dasPayment.js').generateExampleDasPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestDasPaymentPost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleDasPaymentsJson(5);
        payments = await starkbank.dasPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestDasPaymentGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.dasPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestDasPaymentPostAndDelete', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleDasPaymentsJson(1);
        payments = await starkbank.dasPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.dasPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestDasPaymentInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.dasPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.dasPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestDasPaymentPdfGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.dasPayment.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.dasPayment.pdf(payment.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});
