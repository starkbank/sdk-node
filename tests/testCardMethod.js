const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;
describe('CardMethod', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let methods = await starkbank.cardMethod.query();
        for await(let method of methods) {
            assert(method.code != null);
        }
    });
});
