const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleWebhook = require('./utils/webhook').generateExampleWebhook;

starkbank.user = require('./utils/user').exampleProject;


describe('TestWebhookGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const webhooks = await starkbank.webhook.query({limit: 5});
        for await (let webhook of webhooks) {
            assert(typeof webhook.id == 'string');
            i += 1;
        }
    });
});

describe('TestWebhookPostAndDelete', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let webhook = generateExampleWebhook(1);
        webhook = await starkbank.webhook.create({url: webhook.url, subscriptions: webhook.subscriptions});
        assert(typeof webhook.id == 'string');
        webhook = await starkbank.webhook.delete(webhook.id);
        assert(typeof webhook.id == 'string');
    });
});

describe('TestWebhookInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let webhooks = await starkbank.webhook.query({limit: 1});
        for await (let webhook of webhooks) {
            assert(typeof webhook.id == 'string');
            webhook = await starkbank.webhook.get(webhook.id);
            assert(typeof webhook.id == 'string');
        }
    });
});

describe('TestWebhookGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.webhook.page({ limit: 2, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length <= 4);
    });
});
