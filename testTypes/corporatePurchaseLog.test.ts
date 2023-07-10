///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestcorporatePurchaseGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let purchases = await starkbank.corporatePurchase.log.query({"limit": 1});
        for await (let purchase of purchases) {
            purchase = await starkbank.corporatePurchase.log.get(purchase.id)
            assert(typeof purchase.id == 'string')
        }
    });
});

describe('TestcorporatePurchaseQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        let purchases = await starkbank.corporatePurchase.log.query({limit: 5});
        for await (let purchase of purchases) {
            assert(typeof purchase.id == 'string');
            i += 1;    
        }
        assert(i === 5);
    });
});

describe('TestcorporatePurchasePage', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.corporatePurchase.Log[]
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
