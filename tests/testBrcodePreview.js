const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestBrcodePreview', function(){
    this.timeout(10000);
    it('test_success', async () => {
        const brcode = "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A";
        const previews = await starkbank.brcodePreview.query({brcodes: [brcode]});
        for await (let preview of previews) {
            assert(typeof preview.status == 'string');
        }
    });
});
