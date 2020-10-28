const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestBoletoLogGet', function(){
    this.timeout(20000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.boletoHolmes.log.query({limit: 150});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i <= 150);
    });
});


describe('TestBoletoLogInfoGet', function(){
    this.timeout(20000);
    it('test_success', async () => {
        let logs = await starkbank.boletoHolmes.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.boletoHolmes.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
