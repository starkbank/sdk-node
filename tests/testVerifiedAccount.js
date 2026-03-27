const assert = require('assert');
const starkbank = require('../index.js');
const { bankInfoExample, pixKeyExample } = require('./utils/verifiedAccount.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestVerifiedAccountCreate', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([
            bankInfoExample(),
            pixKeyExample(),
        ]);
        for (let verifiedAccount of verifiedAccounts) {
            assert(typeof verifiedAccount.id == 'string');
        }
    });
});


describe('TestVerifiedAccountCreateAndGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([bankInfoExample()]);
        let created = verifiedAccounts[0];
        assert(typeof created.id == 'string');
        let retrieved = await starkbank.verifiedAccount.get(created.id);
        assert(retrieved.id === created.id);
    });
});


describe('TestVerifiedAccountCreateAndCancel', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([pixKeyExample()]);
        let created = verifiedAccounts[0];
        assert(typeof created.id == 'string');
        let canceled = await starkbank.verifiedAccount.cancel(created.id);
        assert(canceled.id === created.id);
        assert(canceled.status === 'canceled');
    });
});


describe('TestVerifiedAccountQuery', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const verifiedAccounts = await starkbank.verifiedAccount.query({
            limit: 3,
            status: 'active',
            after: '2019-04-01',
            before: '2030-04-30',
        });
        for await (let verifiedAccount of verifiedAccounts) {
            assert(typeof verifiedAccount.id == 'string');
            i += 1;
        }
        assert(i <= 3);
    });
});


describe('TestVerifiedAccountGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.verifiedAccount.page({ limit: 5, cursor: cursor });
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


