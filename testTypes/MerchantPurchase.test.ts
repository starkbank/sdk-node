///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';

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
        const purchases = await starkbank.merchantPurchase.query({limit: 5});
        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestMerchantPurchaseGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.MerchantPurchase[] | null = null;    
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

describe('TestMerchantPurchase', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let purchaseId = "";
        let purchases = await starkbank.merchantPurchase.query({status: "approved"})

        for await (let purchase of purchases) {
            purchaseId = purchase.id;
            break;
        }
        let updatedPurchase = await starkbank.merchantPurchase.update(purchaseId, {amount: 0, status: "canceled"});
        assert(updatedPurchase.id == purchaseId);
    });
});