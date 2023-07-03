///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateBalanceGet', function(){
    it('test_success', async () => {
        let corporateBalance = await starkbank.corporateBalance.get();
        assert(typeof corporateBalance.amount == 'number');
    });
});