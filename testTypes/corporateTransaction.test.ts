///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestcorporateTransactionGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let transactions = await starkbank.corporateTransaction.query({ limit: 1 });
        for await (let transaction of transactions) {
            transaction = await starkbank.corporateTransaction.get(transaction.id)
            assert(typeof transaction.id == 'string')
        }
    });
});

describe('TestCorporateTransactionQuery', function(){
    it('test_success', async () => {
        let transactions = await starkbank.corporateTransaction.query({ limit: 3 });
        for await (let transaction of transactions) {
            assert(typeof transaction.id == 'string');
        }
    });
});

describe('TestCorporateTransactionPage', function(){
    it('test_success', async () => {
        let [page, cursor] = await starkbank.corporateTransaction.page();
        for await (let entity of page) {
            assert(typeof entity.id == 'string');
        }
        assert(typeof cursor == 'string');
    });
});
