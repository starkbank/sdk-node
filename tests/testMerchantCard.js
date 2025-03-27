const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantCardQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantCards = await starkbank.merchantCard.query({limit: 3});
        for await (let card of merchantCards) {
            let merchantCard = await starkbank.merchantCard.get(card.id);
            assert(typeof merchantCard.id == 'string');
        }
    });
});

describe('MerchantCardPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantCard.page({ limit: 5, cursor: cursor });
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
