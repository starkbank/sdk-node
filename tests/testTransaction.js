const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleTransactionsJson = require('./utils/transaction.js').generateExampleTransactionsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestTransactionPost', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let transactions = generateExampleTransactionsJson(1);
        transactions = await starkbank.transaction.create(transactions);
        for (let transaction of transactions) {
            assert(typeof transaction.id == 'string');
        }
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
