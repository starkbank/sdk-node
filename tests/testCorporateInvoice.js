const assert = require('assert');
const starkbank = require('../index.js');
const randomInt = require('./utils/random.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateInvoiceQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const invoices = await starkbank.corporateInvoice.query({limit: 5});
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestCorporateInvoicePost', function(){
    this.timeout(10000);
    it('test_success', async () => {          
        invoices = await starkbank.corporateInvoice.create(
            new starkbank.CorporateInvoice({"amount": randomInt.randomInt(1000, 10000)})
        );
        assert(typeof invoices.id == 'string');
    });
});
