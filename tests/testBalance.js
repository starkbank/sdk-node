const assert = require('assert');
const starkbank = require('../starkbank');
const generateExampleBoletosJson = require('./utils/boleto.js').generateExampleBoletosJson;

starkbank.user = require('./utils/user').exampleProject;


describe('TestBalanceGet', () => {
    it('test_success', async() => {
        let balance = await starkbank.balance.get();
        assert(typeof balance.amount == 'number');
    });
});
