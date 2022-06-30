///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
import { exampleProject } from './utils/user';


starkbank.user = exampleProject;

describe('TestBrcodePreview', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        const brcode = "00020126390014br.gov.bcb.pix0117valid@sandbox.com52040000530398654041.005802BR5908Jon Snow6009Sao Paulo62110507sdktest63046109";
        const previews = await starkbank.brcodePreview.query({brcodes: [brcode]});
        for await (let preview of previews) {
            assert(typeof preview.status == 'string');
        }
    });
});
