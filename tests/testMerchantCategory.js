const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('CardMethod', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let categories = await starkbank.merchantCategory.query({"search": "food"})
        for await(let categorie of categories) {
            assert(categorie.code != null);
        }
    });
});
