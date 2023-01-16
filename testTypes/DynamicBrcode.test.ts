///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleDynamicBrcodesJson = require('./utils/dynamicBrcode.js').generateExampleDynamicBrcodesJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestDynamicBrcodePost', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let brcodes = generateExampleDynamicBrcodesJson(5);
        brcodes = await starkbank.dynamicBrcode.create(brcodes);
        for (let brcode of brcodes) {
            assert(typeof brcode.id == 'string');
        }
    });
});

describe('TestDynamicBrcodeGet', function () {
    jest.setTimeout(10000);
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

describe('TestDynamicBrcodeInfoGet', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let brcodes = await starkbank.dynamicBrcode.query({ limit: 1 });
        for await (let brcode of brcodes) {
            assert(typeof brcode.uuid == 'string');
            brcode = await starkbank.dynamicBrcode.get(brcode.uuid);
            assert(typeof brcode.uuid == 'string');
        }
    });
});

describe('TestDynamicBrcodeGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let uuids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.DynamicBrcode[] | null = null;    
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
