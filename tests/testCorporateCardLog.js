const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateCardLogPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporateCard.log.page({ limit: 5, cursor: cursor });
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

describe('TestCorporateCardLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let cards = await starkbank.corporateCard.log.query({"limit": 1})
        for await (let card of cards) {
            card = await starkbank.corporateCard.log.get(card.id)
            assert(typeof card.id == typeof 'String')
        }
    });
});

describe('TestCorporateCardLogQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const cards = await starkbank.corporateCard.log.query({limit: 5});
        for await (let card of cards) {
            assert(typeof card.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});
