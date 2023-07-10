///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporatePurchaseGet', function(){
    it('test_success', async () => {
        let purchase = await starkbank.corporatePurchase.get("4893776241754112");

        assert(typeof purchase.id == 'string');

    });
});

describe('TestCorporatePurchaseQuery', function(){
    it('test_success', async () => {
        let purchases = await starkbank.corporatePurchase.query({limit: 3});

        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
        }
    });
});

describe('TestCorporatePurchasePage', function(){
    it('test_success', async () => {
        let [page, cursor] = await starkbank.corporatePurchase.page({limit: 2});

        for await (let entity of page) {
            assert(typeof entity.id == 'string');
        }

        assert(typeof cursor == 'string');
    });
});

