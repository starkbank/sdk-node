const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;

describe('TestDictKeyInfoGet', function () {
   this.timeout(10000);
   it('test_success', async () => {
      let pixKey = 'valid@sandbox.com';
      let dictKey = await starkbank.dictKey.get(pixKey);
      assert(typeof dictKey.id === 'string');
      assert(dictKey.id === pixKey);
   });
});

describe('TestDictKeyGet', function () {
   this.timeout(10000);
   it('test_success', async () => {
      let i = 0;
      const dictKeys = await starkbank.dictKey.query({ limit: 1, status: 'registered', type: 'evp' });
      for await (let dictKey of dictKeys) {
         assert(typeof dictKey.id == 'string');
         i += 1;
      }
      assert(i === 1);
   });
});

describe('TestDictKeyGetPage', function () {
   this.timeout(10000);
   it('test_success', async () => {
      let ids = [];
      let cursor = null;
      let page = null;
      [page, cursor] = await starkbank.dictKey.page({ limit: 1, cursor: cursor });
      for (let entity of page) {
         assert(!ids.includes(entity.id));
         ids.push(entity.id);
      }
      assert(ids.length == 1);
   });
});
