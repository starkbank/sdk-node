///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateInvoiceCreate', function(){
    it('test_success', async () => {
        let invoice = await starkbank.corporateInvoice.create(new starkbank.CorporateInvoice({amount: 1000}));
        assert(typeof invoice.id == 'string');
    });
});   

describe('TestCorporateInvoiceQuery', function(){
    it('test_success', async () => {
        let invoices = await starkbank.corporateInvoice.query({limit: 3});
        for await (let invoice of invoices) {
            assert(typeof invoice.id == 'string');
        }
    });
});

describe('TestCorporateInvoicePage', function(){
    it('test_success', async () => {
        let [page, cursor] = await starkbank.corporateInvoice.page();
        for await (let entity of page) {
            assert(typeof entity.id == 'string');
        }
        assert(typeof cursor == 'string');
    });
});
