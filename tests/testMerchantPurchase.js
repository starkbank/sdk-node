const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleMerchantSessionJson = require('./utils/merchantSession.js').generateExampleMerchantSessionJson
const generateExampleMerchantSessionPurchaseJson = require('./utils/merchantSession.js').generateExampleMerchantSessionPurchaseJson
const generateExampleMerchantPurchaseJson = require('./utils/merchantPurchase.js').generateExampleMerchantPurchaseJson


starkbank.user = require('./utils/user').exampleProject;

describe('MerchantPurchaseCreate', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchase = await starkbank.merchantPurchase.create(generateExampleMerchantPurchaseJson());
        assert(typeof merchantPurchase.id == 'string');
    });
});

describe('MerchantPurchaseQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        let limit = 3;
        let holderId = "0123456789012345";
        let merchantPurchases = await starkbank.merchantPurchase.query({limit: limit, holderId: holderId});
        for await (let merchantPurchase of merchantPurchases) {
            assert(merchantPurchase.holderId == holderId);
            assert(typeof merchantPurchase.id == 'string');
            i += 1;
        }
        assert(i == limit);
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
        let limit = 5;
        let holderId = "0123456789012345";
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantPurchase.page({ limit: limit, holderId: holderId, cursor: cursor });
            for (let entity of page) {
                assert(entity.holderId == holderId);
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length > limit);
    });
});

describe('MerchantPurchaseCreateAndUpdate', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantPurchase = await starkbank.merchantPurchase.create(generateExampleMerchantPurchaseJson());
        try {
            let updatedMerchantPurchase = await starkbank.merchantPurchase.update(merchantPurchase.id, {
                amount: 0,
                status: "canceled"
            });
            assert(updatedMerchantPurchase.id == merchantPurchase.id);
        } catch (error) {
            assert(error.message.includes("Only approved and unconfirmed purchases can be canceled"));
        }
    });
});
