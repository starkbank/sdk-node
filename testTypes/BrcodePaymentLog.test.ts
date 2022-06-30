///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';


starkbank.user = exampleProject;


describe('TestBrcodePaymentLogGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.brcodePayment.log.query({limit: 2, types: ['success']});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            assert(log.type == 'success');
            i += 1;
        }
        assert(i === 2);
    });
});


describe('TestBrcodePaymentLogInfoGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.brcodePayment.log.query({limit: 1, types: ['created']});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.brcodePayment.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});

describe('TestBrcodePaymentLogGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.brcodePayment.Log[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.brcodePayment.log.page({ limit: 5, cursor: cursor });
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
