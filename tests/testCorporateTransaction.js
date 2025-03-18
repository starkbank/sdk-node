const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateTransactionQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const transactions = await starkbank.corporateTransaction.query({limit: 5});
        for await (let transaction of transactions) {
            assert(typeof transaction.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestCorporateTransactionGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let transactions = await starkbank.corporateTransaction.query({ limit: 1 });
        for await (let transaction of transactions) {
            assert(typeof transaction.id == typeof 'string');
            transaction = await starkbank.corporateTransaction.get(transaction.id);
            assert(typeof transaction.id == typeof 'string');
        }
    });
});

describe('TestCorporateTransactionPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporateTransaction.page({ limit: 5, cursor: cursor });
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
