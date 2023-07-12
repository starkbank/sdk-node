///<reference types="../types/" />

import starkbank, { corporateHolder } from "starkbank";
import assert from 'assert';
const random = require('./utils/random.js').random;

starkbank.user = require('./utils/user').exampleProject;

describe('TestCorporateHolderCreateAndUpdate', function(){
    it('test_success', async () => {
        let holder = await starkbank.corporateHolder.create(
            [new starkbank.CorporateHolder({
                name: "Test - " + 1025425,
                permissions: [new starkbank.corporateHolder.Permission({ ownerType: "project", ownerId: "6253551860842496" })],
                rules: [new starkbank.CorporateRule({ name: "Travel", amount: 200000 })]
            })
        ]);
        
        let holderId = holder[0].id
        assert(typeof holderId == 'string');
        holder = await starkbank.corporateHolder.update(holderId, { status: "blocked" });
        assert(typeof holder.id == 'string');
    });
});

describe('TestcorporateHolderGet', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let holders = await starkbank.corporateHolder.query({ limit: 1 });
        for await (let holder of holders) {
            holder = await starkbank.corporateHolder.get(holder.id)
            assert(typeof holder.id == 'string')
        }
    });
});

describe('TestCorporateHolderQuery', function(){
    it('test_success', async () => {
        let holders = await starkbank.corporateHolder.query({ limit: 3 });
        for await (let holder of holders) {
            assert(typeof holder.id == 'string');    
        }
    });
});

describe('TestCorporateHolderPage', function(){
    it('test_success', async () => {
        let [page, cursor] = await starkbank.corporateHolder.page();
        for await (let entity of page) {
            assert(typeof entity.id == 'string');    
        }
    });
});
