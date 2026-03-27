const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestVerifiedAccountLogQuery', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.verifiedAccount.log.query({
            limit: 3,
            after: '2019-04-01',
            before: '2030-04-30',
        });
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i <= 3);
    });
});


describe('TestVerifiedAccountLogInfoGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.verifiedAccount.log.query({ limit: 5 });
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.verifiedAccount.log.get(log.id);
            assert(typeof log.id == 'string');
            assert(typeof log.account.id == 'string');
        }
    });
});


describe('TestVerifiedAccountLogGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.verifiedAccount.log.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length > 0);
    });
});
