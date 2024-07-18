const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('MerchantSessionQueryLog', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantSessionLogs = await starkbank.merchantSession.log.query({limit: 3});
        for await (let log of merchantSessionLogs) {
            assert(typeof log.id == 'string');
        }
    });
});

describe('MerchantSessionGetLog', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let merchantSessionLogs = await starkbank.merchantSession.log.query({limit: 3});
        for await (let log of merchantSessionLogs) {
            log = await starkbank.merchantSession.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});

describe('MerchantSessionPageLog', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.merchantSession.log.page({ limit: 5, cursor: cursor });
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