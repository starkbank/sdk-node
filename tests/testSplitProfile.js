const assert = require('assert');
const starkbank = require('../index.js');


starkbank.user = require('./utils/user').exampleProject;

describe('TestSplitProfilePut', async function() {
    this.timeout(10000);
    it('test_success', async () => {
        let splitProfile = await starkbank.splitProfile.put([{
            interval: 'day',
            delay: 0
        }]);

        splitProfile = await starkbank.splitProfile.get(splitProfile[0].id);

        assert(splitProfile.interval == 'day');
        assert(splitProfile.delay == 0);
    });
});

describe('TestSplitProfileQueryAndGet', async function(){
    this.timeout(10000);
    it('test_success', async () => {
        let profiles = await starkbank.splitProfile.query({limit: 5});
        for await (let profile of profiles) {
            profile = await starkbank.splitProfile.get(profile.id);
            assert(typeof profile.id == 'string');
        }
    });

    it('test_success_with_params', async () => {
        try {
            await starkbank.splitProfile.query({
                limit: 5,
                status: 'created',
                after: '2020-03-10',
                before: '2020-03-10',
                ids: ['5656565656565656'],
            });
        } catch (e) {
            throw new Error(e)
        }
    });
});

describe('TestSplitProfilePage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.splitProfile.page({ limit: 2, cursor: cursor });
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
