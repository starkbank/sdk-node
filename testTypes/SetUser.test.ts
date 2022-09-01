///<reference types="../types/" />

import * as starkbank from "starkbank";
import assert from 'assert';

const exampleProject = new starkbank.Project(
    {
        environment: 'sandbox',
        id: process.env.SANDBOX_BANK_PROJECT_ID || "",
        privateKey: process.env.SANDBOX_PRIVATE_KEY || ""
    }
);

starkbank.setUser(exampleProject);

describe('TestGetUser', function(){
    it('test_success', async () => {
        let getUser = starkbank.getUser();
        assert(getUser.id == exampleProject.id);
        assert(getUser.privateKey == exampleProject.privateKey);
    });
});
