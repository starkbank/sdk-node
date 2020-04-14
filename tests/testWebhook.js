const assert = require('assert');
const starkbank = require('../starkbank');
const generateExampleWebhook = require('./utils/webhook').generateExampleWebhook;

starkbank.user = require('./utils/user').exampleProject;


describe('TestWebhookGet', () => {
    it('test_success', async () => {
        let i = 0;
        const webhooks = await starkbank.webhook.query({limit: 5});
        for await (let webhook of webhooks) {
            assert(typeof webhook.id == 'string');
            i += 1;
        }
        console.log('Number of webhooks:', i);
    });
});

describe('TestWebhookPostAndDelete', () => {
    it('test_success', async () => {
        let webhook = generateExampleWebhook(1);
        webhook = await starkbank.webhook.create({url: webhook.url, subscriptions: webhook.subscriptions});
        assert(typeof webhook.id == 'string');
        webhook = await starkbank.webhook.delete(webhook.id);
        assert(typeof webhook.id == 'string');
    });
});

describe('TestWebhookInfoGet', () => {
    it('test_success', async () => {
        let webhooks = await starkbank.webhook.query({limit: 1});
        for await (let webhook of webhooks) {
            assert(typeof webhook.id == 'string');
            webhook = await starkbank.webhook.get(webhook.id);
            assert(typeof webhook.id == 'string');
        }
    });
});