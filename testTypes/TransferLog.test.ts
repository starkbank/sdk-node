///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';


starkbank.user = exampleProject;


describe('TestTransferLogGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.transfer.log.query({limit: 5});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 5);
    });
});


describe('TestTransferLogInfoGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.transfer.log.query({limit: 1});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            log = await starkbank.transfer.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});

describe('TestTransferLogGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.transfer.Log[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.transfer.log.page({ limit: 5, cursor: cursor });
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
