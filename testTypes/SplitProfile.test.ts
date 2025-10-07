///<reference types="../types/" />
import assert from 'assert';
import starkbank from "starkbank";
import { exampleProject } from './utils/user';

starkbank.user = exampleProject;


describe('TestSplitProfilePut', function() {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let splitProfile = await starkbank.splitProfile.put([new starkbank.SplitProfile({
            interval: 'week',
            delay: 1
        })]);

        let getSplitProfile = await starkbank.splitProfile.get(splitProfile[0].id);

        assert(getSplitProfile.interval == 'week');
        assert(getSplitProfile.delay == 1);
        assert(getSplitProfile instanceof starkbank.SplitProfile);
    });
});

describe('TestSplitProfileQueryAndGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let profiles = await starkbank.splitProfile.query({limit: 5});
        for await (let profile of profiles) {
            profile = await starkbank.splitProfile.get(profile.id);
            assert(typeof profile.id == 'string');
            assert(profile instanceof starkbank.SplitProfile);
        }
    });

    it('test_success_with_params', async () => {
        try {
            await starkbank.splitProfile.query({
                limit: 5,
                status: ['created'],
                after: '2020-03-10',
                before: '2020-03-10',
                ids: ['5656565656565656'],
            });
        } catch (e) {
            throw new Error(e as string)
        }
    });
});

describe('TestSplitProfilePage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.splitProfile.page({ limit: 2, cursor: cursor });
            for (let entity of page) {
                assert(!ids.includes(entity.id));
                ids.push(entity.id);
                assert(entity instanceof starkbank.SplitProfile);
            }
            if (cursor == null) {
                break;
            }
        }
    });
});
