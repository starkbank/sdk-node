const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateCardPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
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

describe('TestCorporateCardGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let cards = await starkbank.corporateCard.query({"limit": 1})
        for await (let card of cards) {
            card = await starkbank.corporateCard.get(card.id)
            assert(typeof card.id == typeof 'String')
        }
    });
});

describe('TestCorporateCardQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const cards = await starkbank.corporateCard.query({limit: 5});
        for await (let card of cards) {
            assert(typeof card.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestCorporateCardCreate', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let card = await starkbank.corporateCard.create(
            new starkbank.CorporateCard(
                {
                    "holderId": "4787389398515712",
                }
            ), {"expand": ["rules", "securityCode", "number", "expiration"]}
        )
        assert(card.securityCode != '***');
    });
});
