///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateWithdrawalGet', function(){
    it('test_success', async () => {
        let withdrawal = await starkbank.corporateWithdrawal.get("5729494098771968");

        assert(typeof withdrawal.id == 'string');

    });
});

describe('TestCorporateWithdrawalQuery', function(){
    it('test_success', async () => {
        let withdrawals = await starkbank.corporateWithdrawal.query({limit: 3});

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
