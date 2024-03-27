///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestcorporatePurchaseGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let purchases = await starkbank.corporatePurchase.query({ limit: 1 });
        for await (let purchase of purchases) {
            purchase = await starkbank.corporatePurchase.get(purchase.id)
            assert(typeof purchase.id == 'string')
        }
    });
});

describe('TestCorporatePurchaseQuery', function(){
    it('test_success', async () => {
        let purchases = await starkbank.corporatePurchase.query({ limit: 3 });
        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
        }
    });
});

describe('TestCorporatePurchasePage', function(){
    it('test_success', async () => {
        let [page, cursor] = await starkbank.corporatePurchase.page({ limit: 2 });
        for await (let entity of page) {
            assert(typeof entity.id == 'string');
        }
        assert(typeof cursor == 'string');
    });
});
