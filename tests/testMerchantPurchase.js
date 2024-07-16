const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantSessionQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchases = await starkbank.merchantPurchase.query({limit: 3});
        for await (let merchantPurchase of merchantPurchases) {
            assert(typeof merchantPurchase.id == 'string');
        }
    });
});

describe('MerchantSessionGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchase = await starkbank.merchantPurchase.get(5019538395496448);
        assert(typeof merchantPurchase.id == 'string');
    });
});