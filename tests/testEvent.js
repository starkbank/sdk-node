const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestEventGet', () => {
    it('test_success', async () => {
        let i = 0;
        const events = await starkbank.event.query({limit: 5});
        for await (let event of events) {
            assert(typeof event.id == 'string');
            i += 1;
        }
        console.log('Number of events:', i);
    });
});


describe('TestEventInfoGet', () => {
    it('test_success', async () => {
        let events = await starkbank.event.query({limit: 1});
        for await (let event of events) {
            assert(typeof event.id == 'string');
            event = await starkbank.event.get(event.id);
            assert(typeof event.id == 'string');
        }
    });
});

describe('TestEventParse', () => {
    it('test_success', async () => {
        content = '{"event": {"log": {"transfer": {"status": "processing", "updated": "2020-04-03T13:20:33.485644+00:00", "fee": 160, "name": "Lawrence James", "accountNumber": "10000-0", "id": "5107489032896512", "tags": [], "taxId": "91.642.017/0001-06", "created": "2020-04-03T13:20:32.530367+00:00", "amount": 2, "transactionIds": ["6547649079541760"], "bankCode": "01", "branchCode": "0001"}, "errors": [], "type": "sending", "id": "5648419829841920", "created": "2020-04-03T13:20:33.164373+00:00"}, "subscription": "transfer", "id": "6234355449987072", "created": "2020-04-03T13:20:40.784479+00:00"}}';
        valid_signature = 'MEYCIQCmFCAn2Z+6qEHmf8paI08Ee5ZJ9+KvLWSS3ddp8+RF3AIhALlK7ltfRvMCXhjS7cy8SPlcSlpQtjBxmhN6ClFC0Tv6';

        let event = await starkbank.event.parse({
            content: content,
            signature: valid_signature
        });
        console.log(event);
    });

    it('test_invalid_signature', async () => {
        content = '{"event": {"log": {"transfer": {"status": "processing", "updated": "2020-04-03T13:20:33.485644+00:00", "fee": 160, "name": "Lawrence James", "accountNumber": "10000-0", "id": "5107489032896512", "tags": [], "taxId": "91.642.017/0001-06", "created": "2020-04-03T13:20:32.530367+00:00", "amount": 2, "transactionIds": ["6547649079541760"], "bankCode": "01", "branchCode": "0001"}, "errors": [], "type": "sending", "id": "5648419829841920", "created": "2020-04-03T13:20:33.164373+00:00"}, "subscription": "transfer", "id": "6234355449987072", "created": "2020-04-03T13:20:40.784479+00:00"}}';
        invalid_signature = 'MEYCIQCmFCAn2Z+6qEHmf8paI08Ee5ZJ9+KvLWSS3ddp8+RF3AIhALlK7ltfRvMCXhjS7cy8SPlcSlpQtjBxmhN6ClFC0Tv5';

        try {
            await starkbank.event.parse({
                content: content,
                signature: invalid_signature
            });
            throw new Error('Oops, signature was accepted!');
        } catch (e) {
            if (e instanceof starkbank.error.InvalidSignatureError)
                console.log('Correctly rejected signature');
            else throw e;
        }
    });

    it('test_malformed_signature', async () => {
        content = '{"event": {"log": {"transfer": {"status": "processing", "updated": "2020-04-03T13:20:33.485644+00:00", "fee": 160, "name": "Lawrence James", "accountNumber": "10000-0", "id": "5107489032896512", "tags": [], "taxId": "91.642.017/0001-06", "created": "2020-04-03T13:20:32.530367+00:00", "amount": 2, "transactionIds": ["6547649079541760"], "bankCode": "01", "branchCode": "0001"}, "errors": [], "type": "sending", "id": "5648419829841920", "created": "2020-04-03T13:20:33.164373+00:00"}, "subscription": "transfer", "id": "6234355449987072", "created": "2020-04-03T13:20:40.784479+00:00"}}';
        malformed_signature = 'something is definitely wrong';

        try {
            await starkbank.event.parse({
                content: content,
                signature: malformed_signature
            });
            throw new Error('Oops, signature was accepted!');
        } catch (e) {
            if (e instanceof starkbank.error.InvalidSignatureError)
                console.log('Correctly rejected signature');
        else throw e;
        }
    });
});
