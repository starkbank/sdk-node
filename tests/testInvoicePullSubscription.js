const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleInvoicePullSubscriptionJson = require('./utils/invoicePullSubscription.js').generateExampleInvoicePullSubscriptionJson;

starkbank.user = require('./utils/user.js').exampleProject;

describe('TestInvoicePullSubscriptionCreatePush', function(){
    this.timeout(10000);
    it('test_success_push', async () => {
        let subscriptions = generateExampleInvoicePullSubscriptionJson("push");
        subscriptions = await starkbank.invoicePullSubscription.create([subscriptions]);
        for await (let subscription of subscriptions) {
            assert(typeof subscription.id == 'string');
        }
    });

    it('test_success_qrcode', async () => {
        let subscriptions = generateExampleInvoicePullSubscriptionJson("qrcode");
        subscriptions = await starkbank.invoicePullSubscription.create([subscriptions]);
        for await (let subscription of subscriptions) {
            assert(typeof subscription.id == 'string');
        }
    });

    it('test_success_qrcode_and_payment', async () => {
        let subscriptions = generateExampleInvoicePullSubscriptionJson("qrcodeAndPayment");
        subscriptions = await starkbank.invoicePullSubscription.create([subscriptions]);
        for await (let subscription of subscriptions) {
            assert(typeof subscription.id == 'string');
        }
    });

    it('test_success_payment_and_or_qrcode', async () => {
        let subscriptions = generateExampleInvoicePullSubscriptionJson("paymentAndOrQrcode");
        subscriptions = await starkbank.invoicePullSubscription.create([subscriptions]);
        for await (let subscription of subscriptions) {
            assert(typeof subscription.id == 'string');
        }
    });
});

describe('TestInvoicePullSubscriptionGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const subscriptions = await starkbank.invoicePullSubscription.query({limit: 5});
        for await (let subscription of subscriptions) {
            assert(typeof subscription.id == 'string');
            i += 1;
        }
        assert(i > 0);
    });
});

describe('TestInvoicePullSubscriptionQueryAndGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let subscriptions = await starkbank.invoicePullSubscription.query({limit: 5});
        let i = 0;
        for await (let subscription of subscriptions) {
            subscription = await starkbank.invoicePullSubscription.get(subscription.id);
            assert(typeof subscription.id == 'string');
            i += 1;
        }
        assert(i > 0);
    });
});

describe('TestInvoicePullSubscriptionPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.invoicePullSubscription.page({ limit: 5, cursor: cursor });
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
