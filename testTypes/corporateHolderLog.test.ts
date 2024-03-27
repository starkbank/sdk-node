///<reference types="../types/" />

import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;

describe('TestcorporateHolderGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let holders = await starkbank.corporateHolder.log.query({ limit: 1 });
        for await (let holder of holders) {
            holder = await starkbank.corporateHolder.log.get(holder.id)
            assert(typeof holder.id == 'string')
        }
    });
});

describe('TestcorporateHolderQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        let holders = await starkbank.corporateHolder.log.query({ limit: 5 });
        for await (let holder of holders) {
            assert(typeof holder.id == 'string');
            i += 1;    
        }
        assert(i === 5);
    });
});

describe('TestcorporateHolderPage', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.corporateHolder.Log[]
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.corporateHolder.log.page({ limit: 5, cursor: cursor });
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
