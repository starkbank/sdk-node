const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('CardMethod', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let countries = await starkbank.merchantCountry.query({"search": "brazil"})
        for await(let country of countries) {
            assert(country.code != null);
        }
    });
});
