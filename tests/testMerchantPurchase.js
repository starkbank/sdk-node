const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantPurchaseQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchases = await starkbank.merchantPurchase.query({limit: 3});
        for await (let merchantPurchase of merchantPurchases) {
            assert(typeof merchantPurchase.id == 'string');
        }
    });
});

describe('MerchantPurchaseGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchases = await starkbank.merchantPurchase.query({limit: 3});
        for await (let purchase of merchantPurchases) {
            let merchantPurchase = await starkbank.merchantPurchase.get(purchase.id);
            assert(typeof merchantPurchase.id == 'string');
        }
    });
});

describe('MerchantPurchasePage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantPurchase.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length == 10);
    });
});