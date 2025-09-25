///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';

starkbank.user = exampleProject;


describe('TestInvoicePullRequestLogGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.invoicePullRequest.log.query({limit: 5});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
    });
});

describe('TestInvoicePullRequestLogQueryAndGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let logs = await starkbank.invoicePullRequest.log.query({limit: 5});
        for await (let log of logs) {
            log = await starkbank.invoicePullRequest.log.get(log.id);
            assert(typeof log.id == 'string');
        }
    });
});

describe('TestInvoicePullRequestLogPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.invoicePullRequest.log.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
    });
});
