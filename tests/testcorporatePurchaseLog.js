const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporatePurchaseLogQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const purchases = await starkbank.corporatePurchase.log.query({limit: 5});
        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestCorporatePurchaseLogGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let purchases = await starkbank.corporatePurchase.log.query({ limit: 1 });
        for await (let purchase of purchases) {
            assert(typeof purchase.id == typeof 'string');
            purchase = await starkbank.corporatePurchase.log.get(purchase.id);
            assert(typeof purchase.id == typeof 'string');
        }
    });
});

describe('TestCorporatePurchaseLogPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporatePurchase.log.page({ limit: 5, cursor: cursor });
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
