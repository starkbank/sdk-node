///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestMerchantCardLogGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const cards = await starkbank.merchantCard.log.query({limit: 1});
        for await (let card of cards) {
            card = await starkbank.merchantCard.log.get(card.id);
            assert(typeof card.id == 'string');
        }
    });
});

describe('TestMerchantCardLogGetQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const cards = await starkbank.merchantCard.log.query({limit: 5});
        for await (let card of cards) {
            assert(typeof card.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestMerchantCardLogGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.merchantCard.Log[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantCard.log.page({ limit: 5, cursor: cursor });
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
