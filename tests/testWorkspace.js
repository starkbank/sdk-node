const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestWorkspace', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let workspaces = await starkbank.workspace.query({limit: 5});
        for await (let workspace of workspaces) {
            assert(typeof workspace.id == 'string');
        }
    });
});

describe('TestWebhookInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let workspaces = await starkbank.workspace.query({limit: 5});
        for await (let workspace of workspaces) {
            assert(typeof workspace.id == 'string');
            workspace = await starkbank.workspace.get(workspace.id);
            assert(typeof workspace.id == 'string');
        }
    });
});