const assert = require('assert');
const https = require('https');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestHttpsAgent', function () {
    this.timeout(10000);

    afterEach(() => {
        starkbank.setHttpsAgent(null);
    });

    it('test_success', async () => {
        const agent = new https.Agent({ keepAlive: true });
        starkbank.setHttpsAgent(agent);

        let balance = await starkbank.balance.get();

        assert(typeof balance.amount == 'number');
        assert.strictEqual(starkbank.getHttpsAgent(), agent);
    });
});
