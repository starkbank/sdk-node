const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleDynamicBrcodesJson = require('./utils/dynamicBrcode.js').generateExampleDynamicBrcodesJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestDynamicBrcodePost', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let brcodes = generateExampleDynamicBrcodesJson(5);
        brcodes = await starkbank.dynamicBrcode.create(brcodes);
        for (let brcode of brcodes) {
            assert(typeof brcode.uuid == 'string');
        }
    });
});

describe('TestDynamicBrcodeQuery', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const brcodes = await starkbank.dynamicBrcode.query({ limit: 5 });
        for await (let brcode of brcodes) {
            assert(typeof brcode.uuid == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});

describe('TestDynamicBrcodeQueryGet', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let brcodes = await starkbank.dynamicBrcode.query({ limit: 1 });
        for await (let brcode of brcodes) {
            assert(typeof brcode.uuid == 'string');
            brcode = await starkbank.dynamicBrcode.get(brcode.uuid);
            assert(typeof brcode.uuid == 'string');
        }
    });
});

describe('TestDynamicBrcodePage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let uuids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.dynamicBrcode.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!uuids.includes(entity.uuid));
                uuids.push(entity.uuid);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(uuids.length == 10);
    });
});
