const assert = require('assert');
const starkbank = require('../index.js');
const starkcore = require("../node_modules/starkcore/starkcore/error.js");
const generateExampleSplitReceiverJson = require('./utils/splitReceiver.js').generateExampleSplitReceiverJson;


starkbank.user = require('./utils/user').exampleProject;

describe('TestSplitReceiverPost', function() {
    this.timeout(10000);
    it('test_success', async () => {
        let splitReceiver = generateExampleSplitReceiverJson();
        splitReceiver = await starkbank.splitReceiver.create([splitReceiver]);
        splitReceiver = splitReceiver[0];
        assert(splitReceiver.id != '');
    });

    it('test_failure', async () => {
        let splitReceiver = generateExampleSplitReceiverJson();
        splitReceiver.taxId = '1234567890';
        try {
            await starkbank.splitReceiver.create([splitReceiver]);
            throw new Error('Test should fail');
        } catch (e) {
            assert(e instanceof starkcore.InputErrors);
        }
    });
});

describe('TestSplitReceiverQueryAndGet', function() {
    this.timeout(10000);
    it('test_success', async () => {
        let splitReceivers = await starkbank.splitReceiver.query({limit: 5});
        for await (let splitReceiver of splitReceivers) {
            assert(splitReceiver.id != '');
            let getSplitReceiver = await starkbank.splitReceiver.get(splitReceiver.id);
            assert(getSplitReceiver.id != '');
            assert(getSplitReceiver.id == splitReceiver.id);
        }
    });
});

describe('TestSplitReceiverQuery', async function () {
    this.timeout(10000);
    it('test_success', async () => {
        let splitReceivers = await starkbank.splitReceiver.query({limit: 5});
        for await (let splitReceiver of splitReceivers) {
            assert(splitReceiver.id != '');
        }
    });

    it('test_success_with_params', async () => {
        try {
            await starkbank.splitReceiver.query({
                limit: 5,
                status: 'created',
                tags: ['test'],
                after: '2020-03-10',
                before: '2020-03-10',
                ids: ['5656565656565656'],
            });
        } catch (e) {
            throw new Error(e)
        }
    });
});

describe('TestSplitReceiverPage', async function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.splitReceiver.page({ limit: 2, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length == 4);
    });

    it('test_success_with_params', async () => {
        try {
            await starkbank.splitReceiver.page({
                limit: 5,
                status: 'created',
                tags: ['test'],
                after: '2020-03-10',
                before: '2020-03-10',
                ids: ['5656565656565656'],
            });
        } catch (e) {
            throw new Error(e)
        }
    });
});
