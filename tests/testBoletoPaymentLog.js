const assert = require('assert');
const starkbank = require('../starkbank');

starkbank.user = require('./utils/user').exampleProject;


describe('TestBoletoPaymentLogGet', () => {
    it('test_success', async() => {
        let i = 0;
        const logs = await starkbank.payment.boleto.log.query(150);
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of logs:', i);
    });
});


describe('TestBoletoPaymentLogInfoGet', () => {
    it('test_success', async () => {
        let logs = await starkbank.payment.boleto.log.query(1);
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.payment.boleto.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
