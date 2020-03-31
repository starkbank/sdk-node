const assert = require('assert');
const starkbank = require('../starkbank');

starkbank.user = require('./utils/user').exampleProject;


describe('TestBoletoLogGet', () => {
    it('test_success', async() => {
        let i = 0;
        const logs = await starkbank.boleto.log.query({limit: 150});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of logs:', i);
    });
});


describe('TestBoletoLogInfoGet', () => {
    it('test_success', async () => {
        let logs = await starkbank.boleto.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.boleto.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
