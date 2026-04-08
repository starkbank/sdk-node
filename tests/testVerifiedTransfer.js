const assert = require('assert');
const starkbank = require('../index.js');
const { bankInfoExample } = require('./utils/verifiedAccount.js');
const { example } = require('./utils/verifiedTransfer.js');

starkbank.user = require('./utils/user').exampleProject;


describe('TestVerifiedTransferCreate', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([bankInfoExample()]);
        let accountId = verifiedAccounts[0].id;
        let verifiedTransfers = await starkbank.verifiedTransfer.create([example(accountId)]);
        for await (let verifiedTransfer of verifiedTransfers) {
            assert(typeof verifiedTransfer.id == 'string');
            let getTransfer = await starkbank.transfer.get(verifiedTransfer.id);
            assert(getTransfer.id == verifiedTransfer.id);
        }
    });
});
