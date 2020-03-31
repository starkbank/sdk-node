const assert = require('assert');
const starkbank = require('../starkbank');
const generateExampleUtilityPaymentsJson = require('./utils/utilityPayment.js').generateExampleUtilityPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestUtilityPaymentPost', () => {
    it('test_success', async () => {
        let payments = await generateExampleUtilityPaymentsJson(5);
        payments = await starkbank.payment.utility.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestUtilityPaymentGet', () => {
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.payment.utility.query({limit: 150});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of boletos:', i);
    });
});

describe('TestUtilityPaymentPostAndDelete', () => {
    it('test_success', async () => {
        let payments = await generateExampleUtilityPaymentsJson(1);
        payments = await starkbank.payment.utility.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.payment.utility.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestUtilityPaymentInfoGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.payment.utility.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.payment.utility.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestUtilityPaymentPdfGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.payment.utility.query({limit: 1, status: 'processing'});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.payment.utility.pdf(payment.id);
            assert(typeof pdf == 'string');
        }
    });
});
