///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';
const generateExampleInvoicesJson = require('./utils/invoice.js').generateExampleInvoicesJson;
const generateExampleInvoicePullRequestJson = require('./utils/invoicePullRequest').generateExampleInvoicePullRequestJson;
const generateExampleInvoicePullSubscriptionJson = require('./utils/invoicePullSubscription').generateExampleInvoicePullSubscriptionJson;

starkbank.user = exampleProject;


describe("TestInvoicePullRequestCreateAndCancel", function(){
    jest.setTimeout(10000);
    it("test_success", async () => {
        let invoices = await starkbank.invoice.create(generateExampleInvoicesJson(1));
        let invoiceId = invoices[0].id;
        let subscriptions = await starkbank.invoicePullSubscription.create(generateExampleInvoicePullSubscriptionJson('qrcodeAndPayment'));
        let subscriptionId = subscriptions[0].id;
        
        let requests = await starkbank.invoicePullRequest.create(generateExampleInvoicePullRequestJson(invoiceId, subscriptionId));
        let request = requests[0];
        assert(request.id != null);

        let cancelRequest = await starkbank.invoicePullRequest.cancel(request.id);
        assert(cancelRequest.id == request.id);
        assert(cancelRequest.status == 'canceled');
    });
});

describe('TestInvoicePullRequestGet', function(){
    jest.setTimeout(10000);
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
    jest.setTimeout(10000);
    it('test_success', async () => {
        let requests = await starkbank.invoicePullRequest.query({limit: 5});
        for await (let request of requests) {
            request = await starkbank.invoicePullRequest.get(request.id);
            assert(typeof request.id == 'string');
        }
    });
});

describe('TestInvoicePullRequestPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
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
