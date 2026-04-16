///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';
import { bankInfoExample } from './utils/verifiedAccount';
import { example } from './utils/verifiedTransfer';


starkbank.user = exampleProject;


describe('TestVerifiedTransferCreate', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let verifiedAccounts = await starkbank.verifiedAccount.create([bankInfoExample()]);
        let accountId: string = verifiedAccounts[0].id;
        let verifiedTransfers = await starkbank.verifiedTransfer.create([example(accountId)]);
        for (let verifiedTransfer of verifiedTransfers) {
            assert(typeof verifiedTransfer.id == 'string');
            let getTransfer = await starkbank.transfer.get(verifiedTransfer.id);
            assert(getTransfer.id == verifiedTransfer.id);
            console.log(verifiedTransfer);
        }
    });
});
