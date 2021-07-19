const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestBrcodePaymentLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.brcodePayment.log.query({limit: 2, types: 'success'});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            assert(log.type == 'success');
            i += 1;
        }
        assert(i === 2);
    });
});


describe('TestBrcodePaymentLogInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.brcodePayment.log.query({limit: 1, types: 'created'});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.brcodePayment.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});

describe('TestBrcodePaymentLogGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.brcodePayment.log.page({ limit: 5, cursor: cursor });
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
