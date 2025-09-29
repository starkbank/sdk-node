const assert = require('assert');
const starkbank = require('../index.js');


starkbank.user = require('./utils/user.js').exampleProject;

describe('TestSplitReceiverLogQueryAndGet', async function(){
    this.timeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.splitReceiver.log.query({limit: 5});
        for await (let log of logs) {
            log = await starkbank.splitReceiver.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });

    it('test_success_with_params', async () => {
        try {
            await starkbank.splitReceiver.log.query({
                limit: 5,
                types: ['created'],
                after: '2020-03-10',
                before: '2020-03-10',
                receiverIds: ['5656565656565656'],
            });
        } catch (e) {
            throw new Error(e)
        }
    });
});

describe('TestSplitReceiverLogPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.splitReceiver.log.page({ limit: 5, cursor: cursor });
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
