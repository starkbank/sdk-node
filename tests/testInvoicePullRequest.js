const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleInvoicesJson = require('./utils/invoice.js').generateExampleInvoicesJson;
const generateExampleInvoicePullSubscriptionJson = require('./utils/invoicePullSubscription.js').generateExampleInvoicePullSubscriptionJson;
const generateExampleInvoicePullRequestJson = require('./utils/invoicePullRequest.js').generateExampleInvoicePullRequestJson;


starkbank.user = require('./utils/user').exampleProject;

describe('TestInvoicePullRequestCreateAndCancel', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let invoices = await starkbank.invoice.create(generateExampleInvoicesJson(5));
        let invoiceId = invoices[0].id;
        let subscriptions = await starkbank.invoicePullSubscription.create([generateExampleInvoicePullSubscriptionJson('qrcodeAndPayment')]);
        let subscriptionId = subscriptions[0].id;
        
        let requests = await starkbank.invoicePullRequest.create([generateExampleInvoicePullRequestJson(invoiceId, subscriptionId)]);
        let request = requests[0];
        assert(request.id != null);
        let cancelRequest = await starkbank.invoicePullRequest.cancel(request.id);
        assert(cancelRequest.id != null);
    });
});

describe('TestInvoicePullRequestGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const requests = await starkbank.invoicePullRequest.query({limit: 5});
        for await (let request of requests) {
            assert(typeof request.id == 'string');
            i += 1;
        }
    });
});

describe('TestInvoicePullRequestQueryAndGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let requests = await starkbank.invoicePullRequest.query({limit: 5});
        for await (let request of requests) {
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
    });
});
