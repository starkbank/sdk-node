const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleWorkspace = require('./utils/workspace').generateExampleWorkspace;
var exampleOrganization = require('./utils/user').exampleOrganization;


describe('TestWorkspaceCreate', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let workspace = generateExampleWorkspace();
        workspace = await starkbank.workspace.create({ username: workspace.username, name: workspace.name, user: exampleOrganization });
        assert(typeof workspace.id == 'string');
    });
});

describe('TestWorkspaceInfoGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let workspaces = await starkbank.workspace.query({ limit: 5, user: exampleOrganization });
        for await (let workspace of workspaces) {
            assert(typeof workspace.id == 'string');
            workspace = await starkbank.workspace.get(workspace.id, { user: starkbank.organization.replace(exampleOrganization, workspace.id) });
            assert(typeof workspace.id == 'string');
        }
    });
});
