///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';


starkbank.user = exampleProject;


describe('TestEventGetAndAttempt', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        const events = await starkbank.event.query({ limit: 5, isDelivered: false });
        for await (let event of events) {
            assert(typeof event.id == 'string');
            const attempts = await starkbank.event.attempt.query({ eventIds: [event.id], limit: 1 });
            for await (let attempt of attempts) {
                attempt = await starkbank.event.attempt.get(attempt.id as string);
                assert(typeof attempt == 'object');
            }
        }
    });
});


describe('TestEventInfoGetAndPatch', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let events = await starkbank.event.query({limit: 1, isDelivered: false});
        for await (let event of events) {
            assert(typeof event.id == 'string');
            event = await starkbank.event.get(event.id);
            assert(typeof event.id == 'string');
            assert(!event.isDelivered);
            event = await starkbank.event.update(event.id, { isDelivered: true });
            assert(event.isDelivered);
        }
    });
});

describe('TestEventParse', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let content = '{"event": {"log": {"transfer": {"status": "processing", "updated": "2020-04-03T13:20:33.485644+00:00", "fee": 160, "name": "Lawrence James", "accountNumber": "10000-0", "id": "5107489032896512", "tags": [], "taxId": "91.642.017/0001-06", "created": "2020-04-03T13:20:32.530367+00:00", "amount": 2, "transactionIds": ["6547649079541760"], "bankCode": "01", "branchCode": "0001"}, "errors": [], "type": "sending", "id": "5648419829841920", "created": "2020-04-03T13:20:33.164373+00:00"}, "subscription": "transfer", "id": "6234355449987072", "created": "2020-04-03T13:20:40.784479+00:00"}}';
        let valid_signature = 'MEYCIQCmFCAn2Z+6qEHmf8paI08Ee5ZJ9+KvLWSS3ddp8+RF3AIhALlK7ltfRvMCXhjS7cy8SPlcSlpQtjBxmhN6ClFC0Tv6';

        let event = await starkbank.event.parse({
            content: content,
            signature: valid_signature
        });
    });

    it('test_invalid_signature', async () => {
        let content = '{"event": {"log": {"transfer": {"status": "processing", "updated": "2020-04-03T13:20:33.485644+00:00", "fee": 160, "name": "Lawrence James", "accountNumber": "10000-0", "id": "5107489032896512", "tags": [], "taxId": "91.642.017/0001-06", "created": "2020-04-03T13:20:32.530367+00:00", "amount": 2, "transactionIds": ["6547649079541760"], "bankCode": "01", "branchCode": "0001"}, "errors": [], "type": "sending", "id": "5648419829841920", "created": "2020-04-03T13:20:33.164373+00:00"}, "subscription": "transfer", "id": "6234355449987072", "created": "2020-04-03T13:20:40.784479+00:00"}}';
        let invalid_signature = 'MEYCIQCmFCAn2Z+6qEHmf8paI08Ee5ZJ9+KvLWSS3ddp8+RF3AIhALlK7ltfRvMCXhjS7cy8SPlcSlpQtjBxmhN6ClFC0Tv5';

        try {
            await starkbank.event.parse({
                content: content,
                signature: invalid_signature
            });
            throw new Error('Oops, signature was accepted!');
        } catch (e) {
            if (!(e instanceof starkbank.error.InvalidSignatureError))
                throw e;
        }
    });

    it('test_malformed_signature', async () => {
        let content = '{"event": {"log": {"transfer": {"status": "processing", "updated": "2020-04-03T13:20:33.485644+00:00", "fee": 160, "name": "Lawrence James", "accountNumber": "10000-0", "id": "5107489032896512", "tags": [], "taxId": "91.642.017/0001-06", "created": "2020-04-03T13:20:32.530367+00:00", "amount": 2, "transactionIds": ["6547649079541760"], "bankCode": "01", "branchCode": "0001"}, "errors": [], "type": "sending", "id": "5648419829841920", "created": "2020-04-03T13:20:33.164373+00:00"}, "subscription": "transfer", "id": "6234355449987072", "created": "2020-04-03T13:20:40.784479+00:00"}}';
        let malformed_signature = 'something is definitely wrong';

        try {
            await starkbank.event.parse({
                content: content,
                signature: malformed_signature
            });
            throw new Error('Oops, signature was accepted!');
        } catch (e) {
            if (!(e instanceof starkbank.error.InvalidSignatureError))
                throw e;
        }
    });
});

describe('TestEventGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.Event[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.event.page({ limit: 5, cursor: cursor });
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
