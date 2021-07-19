const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestInvoiceLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.invoice.log.query({limit: 150});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});


describe('TestInvoiceLogInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.invoice.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.invoice.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});

describe('TestInvoiceLogPdfGet', function(){
    this.timeout(30000);
    it('test_success', async () => {
        let logs = await starkbank.invoice.log.query({limit: 1, types: 'reversed'});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            let pdf = await starkbank.invoice.log.pdf(log.id);
            assert(Buffer.isBuffer(pdf));
        }
    });
});

describe('TestInvoiceLogGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.invoice.log.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length == 10);
    });
});
