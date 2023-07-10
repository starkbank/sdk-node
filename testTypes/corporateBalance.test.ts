///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateBalanceGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let balance = await starkbank.corporateBalance.get();
        
        assert(typeof balance.amount == 'number');
    });
});