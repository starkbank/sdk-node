const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantCardQueryLog', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.merchantCard.log.query({limit: 3});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
        }
    });
});

describe('MerchantCardPageLog', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
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

describe('MerchantCardGetLog', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.merchantCard.log.query({limit: 1});
        for await (let log of logs) {
            log = await starkbank.merchantCard.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
