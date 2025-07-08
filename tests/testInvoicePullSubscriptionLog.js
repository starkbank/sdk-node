const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user.js').exampleProject;

describe('TestInvoicePullSubscriptionLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.invoicePullSubscription.log.query({limit: 5});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
    });
});

describe('TestInvoicePullSubscriptionLogQueryAndGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.invoicePullSubscription.log.query({limit: 5});
        for await (let log of logs) {
            log = await starkbank.invoicePullSubscription.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});

describe('TestInvoicePullSubscriptionLogPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.invoicePullSubscription.log.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
    });
});
