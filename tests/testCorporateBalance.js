const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;
describe('TestCorporateBalanceGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let balance = await starkbank.corporateBalance.get();
        assert(typeof balance.amount == typeof 1);
    });
});
