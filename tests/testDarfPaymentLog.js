const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestDarfPaymentLogQuery', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.darfPayment.log.query({limit: 5});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestDarfPaymentLogPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.darfPayment.log.page({ limit: 5, cursor: cursor });
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

describe('TestDarfPaymentLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        const logs = await starkbank.darfPayment.log.query({limit: 1});
        for await (let log of logs) {
            log = await starkbank.darfPayment.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});
