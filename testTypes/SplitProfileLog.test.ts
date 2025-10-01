///<reference types="../types/" />
import assert from 'assert';
import starkbank from "starkbank";
import { exampleProject } from './utils/user';

starkbank.user = exampleProject;


describe('TestSplitProfileLogQueryAndGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.splitProfile.log.query({limit: 5});
        for await (let log of logs) {
            log = await starkbank.splitProfile.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });

    it('test_success_with_params', async () => {
        try {
            await starkbank.splitProfile.log.query({
                limit: 5,
                types: ['created'],
                after: '2020-03-10',
                before: '2020-03-10',
                profileIds: ['5656565656565656']
            });
        } catch (e) {
            throw new Error(e as string)
        }
    });
});

describe('TestSplitProfileLogPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.splitProfile.log.page({ limit: 5, cursor: cursor });
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
