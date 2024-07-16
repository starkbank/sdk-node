const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantSessionQueryLog', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.merchantPurchase.log.query({limit: 3});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
        }
    });
});

describe('MerchantSessionGetLog', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.merchantPurchase.log.query({limit: 1});
        for await (let log of logs) {
            log = await starkbank.merchantPurchase.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
