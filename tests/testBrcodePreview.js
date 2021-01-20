const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestBrcodePreview', function(){
    this.timeout(10000);
    it('test_success', async () => {
        const brcode = "00020126580014br.gov.bcb.pix013635719950-ac93-4bab-8ad6-56d7fb63afd252040000530398654040.005802BR5915Stark Bank S.A.6009Sao Paulo62070503***6304AA26";
        const previews = await starkbank.brcodePreview.query({brcodes: [brcode]});
        for await (let preview of previews) {
            assert(typeof preview.status == 'string');
        }
    });
});
