///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestBalanceGet', function(){
    it('test_success', async () => {
        let balance = await starkbank.balance.get();
        assert(typeof balance.amount == 'number');
    });
});
