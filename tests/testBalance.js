const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;
starkbank.Balance
describe('TestBalanceGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let balance = await starkbank.balance.get();
        assert(typeof balance.amount == 'number');
    });
});
