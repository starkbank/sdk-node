const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestInvoicePullRequestGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const requests = await starkbank.invoicePullRequest.query({limit: 5});
        for await (let request of requests) {
            assert(typeof request.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestInvoicePullRequestQueryAndGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let requests = await starkbank.invoicePullRequest.query({limit: 5});
        for await (let request of requests) {
            assert(typeof request.id == 'string');
            request = await starkbank.invoicePullRequest.get(request.id);
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestInvoicePullRequestPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.invoicePullRequest.page({ limit: 5, cursor: cursor });
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
