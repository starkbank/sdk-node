///<reference types="../types/" />
import starkbank from "starkbank";
import assert from 'assert';
const generateExampleInvoicesJson = require('./utils/invoice.js').generateExampleInvoicesJson;
const random = require('./utils/random');

starkbank.user = require('./utils/user').exampleProject;

describe('TestRequestGet', function(){
    jest.setTimeout(10000); 
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
    jest.setTimeout(10000); 
    it('test_success', async () => {
        let path = "/invoice/";
        let query = {"limit": 10, "status": "paid"};
        let list = await starkbank.request.get(path, query);
        let pdf = await starkbank.request.get(`invoice/${list["content"]["invoices"][0]["id"]}/pdf`)
        assert(pdf["content"].length>=1000)
    });
});

describe('TestRequestGetQrcode', function(){
    jest.setTimeout(10000); 
    it('test_success', async () => {
        let path = "/invoice/";
        let query={"limit": 10, "status": "paid"};
        let list = await starkbank.request.get(path, query);
        let pdf = await starkbank.request.get(`invoice/${list["content"]["invoices"][0]["id"]}/qrcode`, {"size": 15})
        assert(pdf["content"].length>=1000)
    });
});

describe('TestRequestGetReversalReceipt', function(){
    jest.setTimeout(10000); 
    it('test_success', async () => {
        let path = "/deposit/log";
        let query={"limit": 1, "types": "reversed"}
        let list = await starkbank.request.get(path, query);
        let pdf = await starkbank.request.get(`deposit/log/${list["content"]["logs"][0]["id"]}/pdf`)
        assert(pdf["content"].length>=1000)
    });
});

describe('TestRequestGetPagination', function(){
    jest.setTimeout(10000); 
    it('test_success', async () => {
        const path = "/invoice/";
        let cursor = null;
        let counter = 0;
        let request: any
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
    jest.setTimeout(10000); 
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
    jest.setTimeout(10000); 
    it('test_success', async () => {
        let request = await starkbank.request.get("/invoice/", {"limit": 1, "status": "paid"});
        const amount = request["content"]["invoices"][0]["amount"]
        let a = await starkbank.request.patch(
            `/invoice/${request["content"]["invoices"][0]["id"]}`,
            {"amount": amount - amount},
        )
        console.log(a)
        const finalState = await starkbank.request.get(`/invoice/${request["content"]["invoices"][0]["id"]}`)
        assert(finalState["content"]["invoice"]["amount"] == 0)
    });
});

describe('TestRequestPut', function(){
    jest.setTimeout(10000);
    it('test_success', async () => {
        const data = {
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
    jest.setTimeout(10000); 
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
            "/transfer/",
            data,
        )

        await starkbank.request.delete(
            `/transfer/${create["content"]["transfers"][0]["id"]}`,
        )
        let finalStatus = await starkbank.request.get(
            `/transfer/${create["content"]["transfers"][0]["id"]}`,
        )

        assert(finalStatus["content"]["transfer"]["status"] == 'canceled')
    })
});
