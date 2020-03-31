const assert = require('assert');
const starkbank = require('../starkbank');

starkbank.user = require('./utils/user').exampleProject;


describe('TestEventGet', () => {
    it('test_success', async () => {
        let i = 0;
        const events = await starkbank.webhook.event.query({limit: 150});
        for await (let event of events) {
            assert(typeof event.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of events:', i);
    });
});


describe('TestEventInfoGet', () => {
    it('test_success', async () => {
        let events = await starkbank.webhook.event.query({limit: 1});
        for await (let event of events) {
            assert(typeof event.id == 'string');
            event = await starkbank.webhook.event.get(event.id);
            assert(typeof event.id == 'string');
        }
    });
});
