///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestcorporateWithdrawalGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let withdrawals = await starkbank.corporateWithdrawal.query({ limit: 1 });
        for await (let withdrawal of withdrawals) {
            withdrawal = await starkbank.corporateWithdrawal.get(withdrawal.id)
            assert(typeof withdrawal.id == 'string')
        }
    });
});

describe('TestCorporateWithdrawalQuery', function(){
    it('test_success', async () => {
        let withdrawals = await starkbank.corporateWithdrawal.query({ limit: 3 });
        for await (let withdrawal of withdrawals) {
            assert(typeof withdrawal.id == 'string');
        }
    });
});

describe('TestCorporateWithdrawalPage', function(){
    it('test_success', async () => {
        let [page, cursor] = await starkbank.corporateWithdrawal.page();
        for await (let entity of page) {
            assert(typeof entity.id == 'string');
        }
        assert(typeof cursor == 'string');
    });
});
