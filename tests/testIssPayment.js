const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleIssPaymentsJson = require('./utils/issPayment.js').generateExampleIssPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestIssPaymentPost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleIssPaymentsJson(5);
        payments = await starkbank.issPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestIssPaymentGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.issPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestIssPaymentPostAndDelete', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await generateExampleIssPaymentsJson(1);
        payments = await starkbank.issPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.issPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestIssPaymentInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.issPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.issPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestIssPaymentPdfGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let payments = await starkbank.issPayment.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.issPayment.pdf(payment.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});
