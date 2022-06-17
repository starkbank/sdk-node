const assert = require('assert');
const starkbank = require('../index.js');
const generateExampleWorkspace = require('./utils/workspace').generateExampleWorkspace;
const readFile = require('./utils/file').readFile;
var exampleOrganization = require('./utils/user').exampleOrganization;


describe('TestWorkspaceCreateAndPatch', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let workspace = generateExampleWorkspace();
        workspace = await starkbank.workspace.create({ username: workspace.username, name: workspace.name, user: exampleOrganization });
        assert(typeof workspace.id == 'string');

        update = generateExampleWorkspace();
        workspace = await starkbank.workspace.update(workspace.id, {
            name: update.name,
            username: update.username,
            allowedTaxIds: update.allowedTaxIds,
            user: starkbank.organization.replace(exampleOrganization, workspace.id)
        });
    });
});

describe("PatchWorkspace", function(){
    this.timeout(10000);
    it("test_success", async () => {
        const [workspaces, next] = await starkbank.workspace.page({limit: 1, user: exampleOrganization });
        picture = readFile('./tests/utils/logo.png');

        workspace = await starkbank.workspace.update(workspaces[0].id, {
            picture: picture,
            pictureType: 'image/png',
            user: starkbank.organization.replace(exampleOrganization, workspaces[0].id)
        });
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

describe('TestWorkspaceGetPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.workspace.page({ limit: 5, cursor: cursor, user: exampleOrganization });
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
