///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleMerchantPurchaseJson = require('./utils/merchantPurchase.js').generateExampleMerchantPurchaseJson

starkbank.user = require('./utils/user').exampleProject;

describe('TestMerchantPurchaseGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const purchases = await starkbank.merchantPurchase.query({limit: 1});
        for await (let purchase of purchases) {
            purchase = await starkbank.merchantPurchase.get(purchase.id);
            assert(typeof purchase.id == 'string');
        }
    });
});

describe('TestMerchantPurchaseGetQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        let limit = 5;
        let holderId = "0123456789012345";
        const purchases = await starkbank.merchantPurchase.query({limit: limit, holderId: holderId});
        for await (let purchase of purchases) {
            assert(purchase.holderId == holderId);
            assert(typeof purchase.id == 'string');
            i += 1;
        }
        assert(i == limit);
    });
});

describe('TestMerchantPurchaseGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.MerchantPurchase[] | null = null;
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

describe('TestMerchantPurchaseAndUpdate', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let merchantPurchase = await starkbank.merchantPurchase.create(new starkbank.MerchantPurchase(generateExampleMerchantPurchaseJson()));
        let params = {
            amount: 0,
            status: "canceled"
        }
        try {
            let updatedMerchantPurchase = await starkbank.merchantPurchase.update(merchantPurchase.id, params);
            assert(updatedMerchantPurchase.id == merchantPurchase.id);
        } catch (error: any) {
            assert(error.message.includes("Only approved and unconfirmed purchases can be canceled"));
        }
    });
});
