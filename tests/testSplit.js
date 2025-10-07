const assert = require('assert');
const starkbank = require('../index.js');
const paySplittedInvoices = require('./utils/split.js').paySplittedInvoices;
const generateExampleSplittedInvoices = require('./utils/split.js').generateExampleSplittedInvoices;


starkbank.user = require('./utils/user.js').exampleProject;

describe('TestCreateInvoiceWithSplit', async function() {
    this.timeout(40000);
    it('test_success', async () => {
        let invoices = await generateExampleSplittedInvoices(1);
        let payments = await paySplittedInvoices(invoices);

        let isInvoicePaid = false;

        while (!isInvoicePaid) {
            for await (let invoice of invoices) {
                getInvoice = await starkbank.invoice.get(invoice.id)
                if (getInvoice.status == "paid") {
                    isInvoicePaid = true;
                }
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        for await (let invoice of invoices) {
            let splitsArray = []
            let tags = ["invoice\/" + invoice.id]
            while (splitsArray.length == 0) {
                splits = await starkbank.split.query({tags: tags})
                for await (let split of splits) {
                    splitsArray.push(split)
                }
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            for await (let split of splitsArray) {
                assert(split.amount == 100)
                assert(split.id != null)
            }
            assert(splitsArray.length == invoice.splits.length)
        }
    });
});

describe('TestSplitQueryAndGet', async function(){
    this.timeout(10000);
    it('test_success', async () => {
        let splits = await starkbank.split.query({limit: 5});
        for await (let split of splits) {
            split = await starkbank.split.get(split.id);
            assert(typeof split.id == 'string');
        }
    });

    it('test_success_with_params', async () => {
        try {
            await starkbank.split.query({
                limit: 5,
                status: 'created',
                after: '2020-03-10',
                before: '2020-03-10',
                receiverIds: ['5656565656565656'],
                tags: ['test'],
                ids: ['5656565656565656'],
            });
        } catch (e) {
            throw new Error(e)
        }
    });
});

describe('TestSplitPage', function () {
    this.timeout(10000);
    it('test_success', async () => {
        let ids = [];
        let cursor = null;
        let page = null;
        for (let i = 0; i < 2; i++) {
            [page, cursor] = await starkbank.split.page({ limit: 5, cursor: cursor });
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
