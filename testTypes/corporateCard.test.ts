///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateCardCreate', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let card = await starkbank.corporateCard.create(
            new starkbank.CorporateCard(
                {
                    holderId: "5764677799772160"
                }
            ), {"expand": ["rules", "securityCode", "number", "expiration"]}
        );
        assert(card.securityCode != '***');
    });
});

describe('TestCorporateCardGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let cards = await starkbank.corporateCard.query({"limit": 1});
        for await (let card of cards) {
            card = await starkbank.corporateCard.get(card.id)
            assert(typeof card.id == 'string')
        }
    });
});

describe('TestCorporateCardQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        let cards = await starkbank.corporateCard.query({limit: 5});
        for await (let card of cards) {
            assert(typeof card.id == 'string');
            i += 1;    
        }
        assert(i === 5);
    });
});

describe('TestCorporateCardPage', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.CorporateCard[] | null = null;  
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporateCard.page({ limit: 5, cursor: cursor });
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
