///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';
const generateExampleInvoicePullSubscriptionJson = require ('./utils/invoicePullSubscription').generateExampleInvoicePullSubscriptionJson;

starkbank.user = exampleProject;


describe('TestInvoicePullSubscriptionCreate', function(){
    jest.setTimeout(10000);
    it('test_success_push', async () => {
        let subscription = await starkbank.invoicePullSubscription.create(generateExampleInvoicePullSubscriptionJson('push'));
        assert(typeof subscription[0].id === 'string');
    });

    it('test_success_qrcode', async () => {
        let subscription = await starkbank.invoicePullSubscription.create(generateExampleInvoicePullSubscriptionJson('qrcode'));
        assert(typeof subscription[0].id === 'string');
    });

    it('test_success_qrcodeAndPayment', async () => {
        let subscription = await starkbank.invoicePullSubscription.create(generateExampleInvoicePullSubscriptionJson('qrcodeAndPayment'));
        assert(typeof subscription[0].id === 'string');
    });

    it('test_success_paymentAndOrQrcode', async () => {
        let subscription = await starkbank.invoicePullSubscription.create(generateExampleInvoicePullSubscriptionJson('paymentAndOrQrcode'));
        assert(typeof subscription[0].id === 'string');
    });
});

describe('TestInvoicePullSubscriptionQueryAndGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let limit = 5;
        const subscriptions = await starkbank.invoicePullSubscription.query({limit: limit});
        
        for await (let subscription of subscriptions) {
            assert(typeof subscription.id === 'string');
            let retrievedSubscription = await starkbank.invoicePullSubscription.get(subscription.id);
            assert(retrievedSubscription.id === subscription.id);
        }
    });
});

describe('TestInvoicePullSubscriptionPage', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let limit = 5;
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.invoicePullSubscription.page({ limit: limit, cursor: cursor });
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