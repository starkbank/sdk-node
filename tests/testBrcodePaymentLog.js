const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestBrcodePaymentLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.brcodePayment.log.query({limit: 2, types: 'success'});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            assert(log.type == 'success');
            i += 1;
        }
        assert(i === 2);
    });
});


describe('TestBrcodePaymentLogInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.brcodePayment.log.query({limit: 1, types: 'created'});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.brcodePayment.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
