const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleTransactionsJson = require('./utils/transaction.js').generateExampleTransactionsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestTransactionPost', function(){
    this.timeout(10000);
    it('test_deprecated_error', async () => {
        let transactions = generateExampleTransactionsJson(1);
        await assert.rejects(
            async () => {
                await starkbank.transaction.create(transactions);
            },
            (err) => {
                assert.strictEqual(err.message, "Function deprecated since v2.36.0");
                return true;
            }
        );
    });
});

describe('TestTransactionGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const transactions = await starkbank.transaction.query({limit: 150});
        for await (let transaction of transactions) {
            assert(typeof transaction.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});

describe('TestTransactionInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let transactions = await starkbank.transaction.query({limit: 1});
        for await (let transaction of transactions) {
            assert(typeof transaction.id == 'string');
            transaction = await starkbank.transaction.get(transaction.id);
            assert(typeof transaction.id == 'string');
        }
    });

    it('test_success_ids', async () => {
        let transactions = await starkbank.transaction.query({limit: 10});
        let transactionsIdsExpected = [];
        for await (let transaction of transactions) {
            transactionsIdsExpected.push(transaction.id);
        }

        let transactionsResult = await starkbank.transaction.query({ids: transactionsIdsExpected});
        let transactionsIdsResult = [];
        for await (let transaction of transactionsResult){
            transactionsIdsResult.push(transaction.id);
        }
        
        transactionsIdsExpected.sort();
        transactionsIdsResult.sort();
        assert(transactionsIdsExpected.length == transactionsIdsResult.length);
        for (let i=0; i<transactionsIdsExpected.length; i++){
            assert(transactionsIdsExpected[i] === transactionsIdsResult[i]);
        }
    });
});

describe('TestTransactionGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.transaction.page({ limit: 5, cursor: cursor });
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
