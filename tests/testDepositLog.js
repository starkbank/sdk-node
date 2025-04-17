const assert = require('assert');
const starkbank = require('../index.js');

starkbank.user = require('./utils/user').exampleProject;


// describe('TestDepositLogGet', function(){
//     this.timeout(10000);
//     it('test_success', async () => {
//         let i = 0;
//         const logs = await starkbank.deposit.log.query({limit: 150});
//         for await (let log of logs) {
//             assert(typeof log.id == 'string');
//             i += 1;
//         }
//         assert(i === 150);
//     });
// });


// describe('TestDepositLogInfoGet', function(){
//     this.timeout(10000);
//     it('test_success', async () => {
//         let logs = await starkbank.deposit.log.query({limit: 1});
//         for await (let log of logs) {
//             assert(typeof log.id == 'string');
//             log = await starkbank.deposit.log.get(log.id);
//             assert(typeof log.id == 'string');
//         }
//     });
// });

// describe('TestDepositLogGetPage', function () {
//     this.timeout(10000);
//     it('test_success', async () => {
//         let ids = [];
//         let cursor = null;
//         let page = null;
//         for (let i = 0; i < 2; i++) {
//             [page, cursor] = await starkbank.deposit.log.page({ limit: 5, cursor: cursor });
//             for (let entity of page) {
//                 assert(!ids.includes(entity.id));
//                 ids.push(entity.id);
//             }
//             if (cursor == null) {
//                 break;
//             }
//         }
//         assert(ids.length == 10);
//     });
// });

describe('TestDepositLogGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let i = 0;
        const logs = await starkbank.deposit.log.query({limit: 150});
        for await (let log of logs) {
            assert(typeof log.id == 'string');
            i += 1;
        }
        assert(i === 150);
    });
});

describe('TestDepositPdfGet', function(){
    this.timeout(10000);
    it('test_success', async () => {
        let deposits = await starkbank.deposit.log.query({limit: 1, types: 'reversed'});
        for await (let deposit of deposits) {
            console.log(deposit);
            let pdf = await starkbank.deposit.log.pdf(deposit.id);
            assert(Buffer.isBuffer(pdf));
            const pdfSignature = pdf.toString('utf8', 0, 5);
            assert(pdfSignature === '%PDF-');
        }
    });
});