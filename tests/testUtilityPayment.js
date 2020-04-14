const assert = require('assert');
const starkbank = require('../starkbank');
const generateExampleUtilityPaymentsJson = require('./utils/utilityPayment.js').generateExampleUtilityPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestUtilityPaymentPost', () => {
    it('test_success', async () => {
        let payments = await generateExampleUtilityPaymentsJson(5);
        payments = await starkbank.utilityPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestUtilityPaymentGet', () => {
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.utilityPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        console.log(i)
        assert(i === 5);
        console.log('Number of boletos:', i);
    });
});

describe('TestUtilityPaymentPostAndDelete', () => {
    it('test_success', async () => {
        let payments = await generateExampleUtilityPaymentsJson(1);
        payments = await starkbank.utilityPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.utilityPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestUtilityPaymentInfoGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.utilityPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.utilityPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestUtilityPaymentPdfGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.utilityPayment.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.utilityPayment.pdf(payment.id);
            assert(typeof pdf == 'string');
        }
    });
});
