const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestDepositInfoGet', function() {
    this.timeout(10000) ;
    it('test_success', async () => {
        let deposits = await starkbank.deposit.query({limit: 3});
        let i = 0;
        for await (let deposit of deposits) {
            let depositId = deposit.id;
            assert(typeof depositId === 'string');
            deposit = await starkbank.deposit.get(depositId);
            assert(depositId === deposit.id);
            i += 1;
        }
        assert(i === 3);
    });
});
