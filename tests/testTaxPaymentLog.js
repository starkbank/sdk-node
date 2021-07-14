const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestTaxPaymentLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.taxPayment.log.query({limit: 5});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});


describe('TestTaxPaymentLogInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.taxPayment.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.taxPayment.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
