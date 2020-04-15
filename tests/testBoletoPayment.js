const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleBoletoPaymentsJson = require('./utils/boletoPayment.js').generateExampleBoletoPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestBoletoPaymentPost', () => {
    it('test_success', async () => {
        let payments = await generateExampleBoletoPaymentsJson(5);
        payments = await starkbank.boletoPayment.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestBoletoPaymentGet', () => {
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.boletoPayment.query({limit: 5});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        console.log(i)
        assert(i === 5);
        console.log('Number of boletos:', i);
    });
});

describe('TestBoletoPaymentPostAndDelete', () => {
    it('test_success', async () => {
        let payments = await generateExampleBoletoPaymentsJson(1);
        payments = await starkbank.boletoPayment.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.boletoPayment.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestBoletoPaymentInfoGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.boletoPayment.query({limit: 1});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.boletoPayment.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestBoletoPaymentPdfGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.boletoPayment.query({limit: 1, status: ['processing']});
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.boletoPayment.pdf(payment.id);
            assert(typeof pdf == 'string');
        }
    });
});
