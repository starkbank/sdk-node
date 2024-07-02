const assert = require('assert');
const starkbank = require('../index.js');
const { pdf } = require('../sdk/boleto/boleto.js');
starkbank.user = require('./utils/user').exampleProject;

describe('TestRequestGet', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        let path = "/invoice/";
        let query = {"limit": 10, "status": "paid"};
        let i=0;
        let list = await starkbank.request.get(path, query);
        for (let invoice of list["content"]["invoices"]) {
            assert(typeof invoice.id == 'string');
            i += 1;
        }
        assert(i === 10);
    });
});

describe('TestRequestGetPdf', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        let path = "/invoice/";
        let query = {"limit": 10, "status": "paid"};
        let list = await starkbank.request.get(path, query);
        let pdf = await starkbank.request.get(`invoice/${list["content"]["invoices"][0]["id"]}/pdf`)
        assert(pdf["content"].length>=1000)
    });
});

describe('TestRequestGetQrcode', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        let path = "/invoice/";
        let query={"limit": 10, "status": "paid"};
        let list = await starkbank.request.get(path, query);
        let pdf = await starkbank.request.get(`invoice/${list["content"]["invoices"][0]["id"]}/qrcode`, {"size": 15})
        assert(pdf["content"].length>=1000)
    });
});

describe('TestRequestGetReversalReceipt', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        let path = "/deposit/log";
        let query={"limit": 1, "types": "reversed"}
        let list = await starkbank.request.get(path, query);
        let pdf = await starkbank.request.get(`deposit/log/${list["content"]["logs"][0]["id"]}/pdf`)
        assert(pdf["content"].length>=1000)
    });
});

describe('TestRequestGetPagination', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        const path = "/invoice/";
        let cursor = null;
        let counter = 0;
        while (true) {
            request = await starkbank.request.get(path, {"cursor":cursor});
            cursor = request["content"]["cursor"]
            for (let i of request["content"]["invoices"]) {
                counter+=1;
            }
            if (cursor == null || counter>199) {
                break;
            }
        }
        assert(counter<=200);
    });
});

describe('TestRequestPost', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        const path = "/invoice/";
        const data = {
            "invoices": [{
                "amount": 100,
                "name": "Iron Bank S.A.",
                "taxId": "20.018.183/0001-80"
            }]
        };
        let request = await starkbank.request.post(path, data);
        assert(request["content"]["invoices"][0]["taxId"] == "20.018.183/0001-80")
    });
});

describe('TestRequestPatch', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        let request = await starkbank.request.get("/invoice/", {"limit": 1, "status": "paid"});
        const amount = request["content"]["invoices"][0]["amount"]
        await starkbank.request.patch(
            `/invoice/${request["content"]["invoices"][0]["id"]}`,
            body={"amount": amount - amount},
        )
        const finalState = await starkbank.request.get(`/invoice/${request["content"]["invoices"][0]["id"]}`)
        assert(finalState["content"]["invoice"]["amount"] == 0)
    });
});

describe('TestRequestPut', function(){
    this.timeout(10000);
    it('test_success', async () => {
        data = {
            "profiles": [
                {
                    "interval": "day",
                    "delay": 0
                }
            ]
        };
        await starkbank.request.put(
            "/split-profile/",
            data,
        )

        let result = await starkbank.request.get("/split-profile/")
        assert(result["content"]["profiles"][0]["delay"] == 0)
    })
})

describe('TestRequestDelete', function(){
    this.timeout(10000); 
    it('test_success', async () => {
        let futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 10);
       
        const data = {
            "transfers": [
                {
                    "amount": 10000,
                    "name": "Steve Rogers",
                    "taxId": "330.731.970-10",
                    "bankCode": "001",
                    "branchCode": "1234",
                    "accountNumber": "123456-0",
                    "accountType": "checking",
                    "scheduled": futureDate.toISOString().split("T")[0],
                    "externalId": new Date().getTime().toString(),
                }
            ]
        }

        let create = await starkbank.request.post(
            path="/transfer/",
            body=data,
        )

        await starkbank.request.delete(
            path=`/transfer/${create["content"]["transfers"][0]["id"]}`,
        )
        let finalStatus = await starkbank.request.get(
            path=`/transfer/${create["content"]["transfers"][0]["id"]}`,
        )

        assert(finalStatus["content"]["transfer"]["status"] == 'canceled')
    })
});
