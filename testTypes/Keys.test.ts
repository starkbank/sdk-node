import assert from "assert";

const starkbank = require("starkbank")

let privateKey, publicKey;

describe("TestCreateKeys", function(){
    jest.setTimeout(10000);
    it("test_success", async () => {
        [privateKey, publicKey] = starkbank.key.create();
        assert(typeof privateKey == 'string');
        assert(typeof publicKey == 'string');

        // or, to also save .pem files in a specific path
        [privateKey, publicKey] = starkbank.key.create('file/keys/');
        assert(typeof privateKey == 'string');
        assert(typeof publicKey == 'string');
    });
});

