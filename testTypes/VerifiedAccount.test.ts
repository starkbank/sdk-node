///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';
import { bankInfoExample, pixKeyExample } from './utils/verifiedAccount';


starkbank.user = exampleProject;


describe('TestVerifiedAccountCreate', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([
            bankInfoExample(),
            pixKeyExample(),
        ]);
        for (let verifiedAccount of verifiedAccounts) {
            assert(typeof verifiedAccount.id == 'string');
        }
    });
});


describe('TestVerifiedAccountCreateAndGet', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([bankInfoExample()]);
        let created = verifiedAccounts[0];
        assert(typeof created.id == 'string');
        let retrieved = await starkbank.verifiedAccount.get(created.id);
        assert(retrieved.id === created.id);
    });
});


describe('TestVerifiedAccountCreateAndCancel', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([pixKeyExample()]);
        let created = verifiedAccounts[0];
        assert(typeof created.id == 'string');
        let canceled = await starkbank.verifiedAccount.cancel(created.id);
        assert(canceled.id === created.id);
        assert(canceled.status === 'canceled');
    });
});


describe('TestVerifiedAccountQuery', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let i = 0;
        const verifiedAccounts = await starkbank.verifiedAccount.query({
            limit: 3,
            status: 'active',
            after: '2019-04-01',
            before: '2030-04-30',
        });
        for await (let verifiedAccount of verifiedAccounts) {
            assert(typeof verifiedAccount.id == 'string');
            i += 1;
        }
        assert(i <= 3);
    });
});


describe('TestVerifiedAccountGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.VerifiedAccount[] | null = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.verifiedAccount.page({ limit: 5, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
            }
            if (cursor == null) {
                break;
            }
        }
        assert(ids.length > 0);
    });
});
