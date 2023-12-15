///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';


starkbank.user = exampleProject;

describe('TestDepositInfoGet', function() {
    jest.setTimeout(10000) ;
    it('test_success', async () => {
        let deposits = await starkbank.deposit.query({limit: 3});
        let i = 0;
        for await (let deposit of deposits) {
            let depositId = deposit.id;
            assert(typeof depositId === 'string');
            deposit = await starkbank.deposit.get(depositId);
            assert(depositId === deposit.id);
            i += 1;
        }
        assert(i === 3);
    });
});

describe('TestDepositGetPage', function () {
    jest.setTimeout(10000);
    it('test_success', async () => {
        let ids: string[] = [];
        let cursor: string | null = null;
        let page: starkbank.Deposit[] | null = null;    
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.deposit.page({ limit: 5, cursor: cursor });
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

describe('TestDepositInfoPatch', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let deposits = await starkbank.deposit.query({status: "created", limit: 1});
        let depositAmount = 0;
        for await (let deposit of deposits) {
            assert(typeof deposit.id == 'string');
            let updatedDeposit = await starkbank.deposit.update(deposit.id, {amount: depositAmount});
            assert(updatedDeposit.amount == depositAmount);
        }
    });
});