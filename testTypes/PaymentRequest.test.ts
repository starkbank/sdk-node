///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { generateExamplePaymentRequestJson } from './utils/paymentRequest'

starkbank.user = require('./utils/user').exampleProject;

describe('TestPaymentRequestPostTransfer', function(){
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(1, ['transfer']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    }, 100000);
});

describe('TestPaymentRequestPostTransaction', function(){
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(1, ['transaction']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    }, 100000);
});

describe('TestPaymentRequestPostBoletoPayment', function(){
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(1, ['boleto-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    }, 100000);
});

describe('TestPaymentRequestPostUtilityPayment', function(){
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(1, ['utility-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    }, 100000);
});

describe('TestPaymentRequestPostBrcodePayment', function(){
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(1, ['brcode-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    }, 100000);
});

describe('TestPaymentRequestPostTaxPayment', function(){
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(1, ['tax-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    }, 100000);
});

describe('TestPaymentRequestPostDarfPayment', function(){
    it('test_success', async () => {
        let requests = await generateExamplePaymentRequestJson(1, ['darf-payment']);
        requests = await starkbank.paymentRequest.create(requests);
        for (let request of requests)
            assert(typeof request.id == 'string');
    }, 100000);
});

describe('TestPaymentRequestGet', function () {
    it('test_success', async () => {
        let i = 0;
        const requests = await starkbank.paymentRequest.query({ centerId: process.env.SANDBOX_CENTER_ID as string, limit: 150 });
        for await (let request of requests) {
            assert(typeof request.id == 'string');
            i += 1;
        }
    }, 30000);
});

describe('TestPaymentRequestGetPage', function () {
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
    }, 10000);
});
