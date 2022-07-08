///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { generateExamplePaymentRequestJson } from './utils/paymentRequest'

starkbank.user = require('./utils/user').exampleProject;

describe('TestPaymentRequestPost', function(){
    jest.setTimeout(100000);
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(10);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    });
});

describe('TestPaymentRequestGet', function () {
    jest.setTimeout(30000);
    it('test_success', async () => {
        let i = 0;
        const requests = await starkbank.paymentRequest.query({ centerId: process.env.SANDBOX_CENTER_ID as string, limit: 150 });
        for await (let request of requests) {
            assert(typeof request.id == 'string');
            i += 1;
        }
    });
});

describe('TestPaymentRequestGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.PaymentRequest[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.paymentRequest.page({ limit: 5, cursor: cursor, centerId: process.env.SANDBOX_CENTER_ID as string});
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
