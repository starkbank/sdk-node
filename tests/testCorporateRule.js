const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user.js').exampleProject;
describe('TestCorporateRule', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let rule =  await new starkbank.CorporateRule({
            name: 'Travel',
            amount: 20000
        });
    });
});
