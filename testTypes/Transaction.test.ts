///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleTransactionsJson = require('./utils/transaction').generateExampleTransactionsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestTransactionPost', function(){
    jest.setTimeout(10000);
    it('test_deprecated_error', async () => {
        let transactions = generateExampleTransactionsJson(1);
        await assert.rejects(
            async () => {
                await starkbank.transaction.create(transactions);
            },
            (err: Error) => {
                assert.strictEqual(err.message, "Function deprecated since v2.36.0");
                return true;
            }
        );
    });
});

describe('TestTransactionGet', function(){
    jest.setTimeout(10000);
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
    jest.setTimeout(10000);
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
        let transactionsIdsExpected: string[] = [];
        for await (let transaction of transactions) {
            transactionsIdsExpected.push(transaction.id);
        }

        let transactionsResult = await starkbank.transaction.query({ids: transactionsIdsExpected});
        let transactionsIdsResult: string[] = [];
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
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.Transaction[] | null = null;    
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
