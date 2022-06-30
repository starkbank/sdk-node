///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';

starkbank.user = require('./utils/user').exampleProject;


describe('TestInstitutionQuery', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        let institution = await starkbank.institution.query({ limit: 5, search: 'stark' });
        assert(institution.length == 2);

        institution = await starkbank.institution.query({ limit: 5, spiCodes: ['20018183'] });
        assert(institution.length == 1);

        institution = await starkbank.institution.query({ limit: 5, strCodes: ['341'] });
        assert(institution.length == 1);
    });
});
