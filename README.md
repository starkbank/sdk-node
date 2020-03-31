# Stark Bank Node SDK

Welcome to the Stark Bank Node SDK! This tool is made for Node 
developers who want to easily integrate with our API.
This SDK version is compatible with the Stark Bank API v2.

If you have no idea what Stark Bank is, check out our [website](https://www.starkbank.com/) 
and discover a world where receiving or making payments 
is as easy as sending a text message to your client!

## Supported Node Versions

This library supports the following Node versions:

* Node 10+

## Stark Bank API documentation

If you want to take a look at our API, follow [this link](https://docs.api.starkbank.com/?version=latest).

## Installation

To install the package with pip, run:

```sh
npm install starkbank
```

## Creating a Project

To connect to the Stark Bank API, you need user credentials. We currently have 2
kinds of users: Members and Projects. Given the purpose of this SDK, it only
supports Projects, which is a type of user made specially for direct API
integrations. To start using the SDK, create your first Sandbox Project in our 
[website](https://sandbox.web.starkbank.com) in the Project session.

Once you've created your project, load it in the SDK:

```javascript
const starkbank = require('starkbank');

let project = new starkbank.Project(
    'sandbox',
    '5656565656565656',
    `-----BEGIN EC PARAMETERS-----
    BgUrgQQACg==
    -----END EC PARAMETERS-----
    -----BEGIN EC PRIVATE KEY-----
    MHQCAQEEIMCwW74H6egQkTiz87WDvLNm7fK/cA+ctA2vg/bbHx3woAcGBSuBBAAK
    oUQDQgAE0iaeEHEgr3oTbCfh8U2L+r7zoaeOX964xaAnND5jATGpD/tHec6Oe9U1
    IF16ZoTVt1FzZ8WkYQ3XomRD4HS13A==
    -----END EC PRIVATE KEY-----
    `
);
```

Once you are done testing and want to move to Production, create a new Project
in your Production account ([click here](https://web.starkbank.com)). Also,
when you are loading your Project, change the environment from `'sandbox'` to
`'production'` in the constructor shown above. 

NOTE: Never hard-code your private key. Get it from an environment variable, for example. 

## Setting up the user

You can inform the project to the SDK in two different ways.

The first way is passing the user argument in all methods, such as:

```javascript
const starkbank = require('starkbank');
(async()=>{
    let balance = await starkbank.balance.get(project);
})();
```

Or, alternatively, if you want to use the same project on all requests,
we recommend you set it as the default user by doing:

```javascript
const starkbank = require('starkbank');

starkbank.user = project;

(async()=>{
    let balance = await starkbank.balance.get();
})();
```

Just select the way of passing the project user that is more convenient to you.
On all following examples we will assume a default user has been set.

## Testing in Sandbox

Your initial balance is zero. For many operations in Stark Bank, you'll need funds
in your account, which can be added to your balance by creating a Boleto. 

In the Sandbox environment, 90% of the created Boletos will be automatically paid,
so there's nothing else you need to do to add funds to your account. Just create
a few and wait around a bit.

In Production, you (or one of your clients) will need to actually pay this Boleto
for the value to be credited to your account.


## Usage

Here are a few examples on how to use the SDK. If you have any doubts, use the built-in
`help()` function to get more info on the desired functionality
(for example: `help(starkbank.boleto.create)`)

### Get balance

To know how much money you have in your workspace, run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let balance = await starkbank.balance.get(project);
    console.log(balance);
})();
```

### Create boletos

You can create boletos to charge customers or to receive money from accounts
you have in other banks.

```javascript
const starkbank = require('starkbank');


(async()=>{
    let boletos = await starkbank.boleto.create([
        new starkbank.Boleto(
            23571,  // R$ 235,71 
            'Buzz Aldrin',
            '012.345.678-90', 
            'Av. Paulista, 200', 
            '10 andar',
            'Bela Vista', 
            'São Paulo',
            'SP',
            '01310-000',
            '2020-04-30',
            5,  // 5%
            2.5,  // 2.5% per month
        ),
    ]);
    for (let boleto of boletos){
        console.log(boleto);
    }
})();

```

### Get boleto

After its creation, information on a boleto may be retrieved by passing its id. 
Its status indicates whether it's been paid.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let boleto = await starkbank.boleto.get('5155165527080960')
    console.log(boleto);
})();

```

### Get boleto PDF

After its creation, a boleto PDF may be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs');

(async()=>{
    let pdf = await starkbank.boleto.pdf('5155165527080960');
    fs.writeFile('boleto.pdf', pdf,  'binary', ()=>{});
})();

```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

### Delete boleto

You can also cancel a boleto by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let boleto = await starkbank.boleto.delete('5155165527080960');
    console.log(boleto);
})();
```

### Query boletos

You can get a list of created boletos given some filters.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let boletos = await starkbank.boleto.query({
            limit: 150,
            after: '2020-03-01',
            before: '2020-03-30',
        }
    );
    for await (let boleto of boletos){
        console.log(boleto);
    }
})();
```

### Query boleto logs

Logs are pretty important to understand the life cycle of a boleto.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let logs = await starkbank.boleto.log.query({limit: 100});
    for await (let log of logs){
        console.log(log);
    }
})();
```

### Get a boleto log

You can get a single log by its id.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let log = await starkbank.boleto.log.get("5155165527080960");
    console.log(log);
})();
```

### Create transfers

You can also create transfers in the SDK (TED/DOC).

```javascript
const starkbank = require('starkbank');

(async()=>{
    let transfers = await starkbank.transfer.create([
        new starkbank.Transfer(
            100,
            '200',
            '0001',
            '10000-0',
            '012.345.678-90',
            'Tony Stark',
            ['iron', 'suit']
        ),
        new starkbank.Transfer(
            200,
            '341',
            '1234',
            '123456-7',
            '012.345.678-90',
            'Jon Snow',
            []
        )
    ])
    for (let transfer of transfers){
        console.log(transfer);
    }
})();
```

### Query transfers

You can query multiple transfers according to filters.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let transfers = await starkbank.transfer.query({
            after: '2020-03-01',
            before: '2020-03-30',
        }
    );
    for await (let transfer of transfers){
        console.log(transfer);
    }
})();
```

### Get transfer

To get a single transfer by its id, run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let transfer = await starkbank.transfer.get("5155165527080960");
    console.log(transfer);
})();
```

### Get transfer PDF

After its creation, a transfer PDF may also be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');

(async()=>{
    let pdf = await starkbank.transfer.pdf('5155165527080960');
    fs.writeFile('transfer.pdf', pdf,  'binary', ()=>{});
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

### Query transfer logs

You can query transfer logs to better understand transfer life cycles.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let logs = await starkbank.transfer.log.query({limit: 50});
    for await (let log of logs){
        console.log(log);
    }
})();
```

### Get a transfer log

You can also get a specific log by its id.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let log = await starkbank.boleto.log.get("5155165527080960");
    console.log(log);
})();
```

### Pay a boleto

Paying boletos is also simple.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payments = await starkbank.payment.boleto.create([
        new starkbank.BoletoPayment(
            "012.345.678-90",
            "take my money",
            "2020-03-13",
            "34191.09008 61207.727308 71444.640008 5 81310001234321",
            null,
            ["take", "my", "money"],
        ),
         new starkbank.BoletoPayment(
            "012.345.678-90",
            "take my money one more time",
            "2020-03-14",
            "34197819200000000011090063609567307144464000",
            ["again"],
        ),
    ])
    for (let payment of payments){
        console.log(payment);
    }
})();
```

### Get boleto payment

To get a single boleto payment by its id, run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payment = await starkbank.payment.boleto.get("5155165527080960");
    console.log(payment);
})();
```

### Get boleto payment PDF

After its creation, a boleto payment PDF may be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');

(async()=>{
    let pdf = await starkbank.payment.boleto.pdf("5155165527080960");
    fs.writeFile('boleto-payment.pdf', pdf,  'binary', ()=>{});
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

### Delete boleto payment

You can also cancel a boleto payment by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payment = await starkbank.payment.boleto.get("5155165527080960");
    console.log(payment);
})();
```

### Query boleto payments

You can search for boleto payments using filters. 

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payments = await starkbank.payment.boleto.query({
            after: '2020-03-01',
            before: '2020-03-30',
        }
    );
    for await (let payment of payments){
        console.log(payment);
    }
})();
```

### Query boleto payment logs

Searches are also possible with boleto payment logs:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payments = await starkbank.payment.boleto.query({});
    for await (let payment of payments){
        console.log(payment);
    }
})();
```


### Get boleto payment log

You can also get a boleto payment log by specifying its id.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let log = await starkbank.payment.boleto.log.get("5155165527080960");
    console.log(log);
})();
```

### Create utility payment

Its also simple to pay utility bills (such electricity and water bills) in the SDK.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payments = await starkbank.payment.utility.create([
        new starkbank.UtilityPayment({
            line: "34197819200000000011090063609567307144464000",
            scheduled: "2020-03-13",
            description: "take my money",
            tags: ["take", "my", "money"],
        }),
        new starkbank.UtilityPayment({
            barCode: "34191.09008 61207.727308 71444.640008 5 81310001234321",
            scheduled: "2020-03-14",
            description: "take my money one more time",
            tags: ["again"],
        }),
    ]);
    for await (let payment of payments){
        console.log(payment);
    }
})();

```

### Query utility payments

To search for utility payments using filters, run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payments = await starkbank.payment.utility.query({
        tags: ["electricity", "gas"],
    });
    for await (let payment of payments){
        console.log(payment);
    }
})();
```

### Get utility payment

You can get a specific bill by its id:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payment = await starkbank.payment.utility.get("5155165527080960");
    console.log(payment);
})();
```

### Get utility payment PDF

After its creation, a utility payment PDF may also be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');

(async()=>{
    let pdf = await starkbank.payment.utility.pdf("5155165527080960");
    fs.writeFile('utility-payment.pdf', pdf,  'binary', ()=>{});
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

### Delete utility payment

You can also cancel a utility payment by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let payment = await starkbank.payment.utility.delete("5155165527080960");
    console.log(payment);
})();
```

### Query utility bill payment logs

You can search for payment logs by specifying filters. Use this to understand the
bills life cycles.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let logs = await starkbank.payment.utility.log.query({
            paymentIds:["102893710982379182", "92837912873981273"],
        }
    );
    for await (let log of logs){
        console.log(log);
    }
})();
```

### Get utility bill payment log

If you want to get a specific payment log by its id, just run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let log = await starkbank.payment.utility.log.get("5155165527080960");
    console.log(log);
})();
```

### Create transactions

To send money between Stark Bank accounts, you can create transactions:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let transactions = await starkbank.transaction.create([
        new starkbank.Transaction({
            amount: 100,  // (R$ 1.00)
            receiverId: "1029378109327810",
            description: "Transaction to dear provider",
            externalId: "12345",  // so we can block anything you send twice by mistake
            tags: ["provider"]
        }),
        new starkbank.Transaction({
            amount: 234,  // (R$ 2.34)
            receiverId: "2093029347820947",
            description: "Transaction to the other provider",
            externalId: "12346",  // so we can block anything you send twice by mistake
            tags: ["provider"]
        }),
    ])
    for (let transaction of transactions){
        console.log(transaction);
    }
})();

```

### Query transactions

To understand your balance changes (bank statement), you can query
transactions. Note that our system creates transactions for you when
you receive boleto payments, pay a bill or make transfers, for example.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let transactions = await starkbank.transaction.query({
            after: "2020-01-01",
            before: "2020-03-01",
        }
    );
    for await (let transaction of transactions){
        console.log(transaction);
    }
})();
```

### Get transaction

You can get a specific transaction by its id:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let transaction = await starkbank.transaction.get("5155165527080960");
    console.log(transaction);
})();
```

### Create webhook subscription

To create a webhook subscription and be notified whenever an event occurs, run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let webhook = await starkbank.webhook.create(
        new starkbank.Webhook({
            url: "https://webhook.site/dd784f26-1d6a-4ca6-81cb-fda0267761ec",
            subscriptions: ["transfer", "boleto", "boleto-payment", "utility-payment"],
        })
    );
        console.log(webhook);
})();
```

### Query webhooks

To search for registered webhooks, run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let webhooks = await starkbank.webhook.query({
            after: "2020-01-01",
            before: "2020-03-01",
        }
    );
    for await (let webhook of webhooks){
        console.log(webhook);
    }
})();
```

### Get webhook

You can get a specific webhook by its id.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let webhook = await starkbank.webhook.get("5155165527080960");
    console.log(webhook);
})();
```

### Delete webhook

You can also delete a specific webhook by its id.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let webhook = await starkbank.webhook.delete("5155165527080960");
    console.log(webhook);
})();
```

### Process webhook events

Its easy to process events that arrived in your webhook. Remember to pass the
signature header so the SDK can make sure its really StarkBank that sent you
the event.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let response = await listen()  // this is the method you made to get the events posted to your webhook
    let event = await starkbank.webhook.event.parse({content: response.content, signature: response.headers["Digital-Signature"]});

    if (event.subscription === "transfer"){
        console.log(event.log.transfer);
    } else if (event.subscription === "boleto"){
        console.log(event.log.boleto);
    } else if (event.subscription === "boleto-payment"){
        console.log(event.log.payment);
    }
})();
```

### Query webhook events

To search for webhooks events, run:

```javascript
const starkbank = require('starkbank');

(async()=>{
    let events = await starkbank.webhook.event.query({
            after: "2020-01-01",
            before: "2020-03-01",
        }
    );
    for await (let event of events){
        console.log(event);
    }
})();
```

### Get webhook event

You can get a specific webhook event by its id.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let event = await starkbank.webhook.event.get("5155165527080960");
    console.log(event);
})();
```

### Delete webhook event

You can also delete a specific webhook event by its id.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let event = await starkbank.webhook.event.delete("5155165527080960");
    console.log(event);
})();
```

### Set webhook events as delivered

This can be used in case you've lost events.
With this function, you can manually set events retrieved from the API as
"delivered" to help future event queries with `isDelivered=False`.

```javascript
const starkbank = require('starkbank');

(async()=>{
    let event = await starkbank.webhook.event.setDelivered("5155165527080960");
    console.log(event);
})();
```

## Handling errors

The SDK may raise one of four types of errors: __InputErrors__, __InternalServerError__, __UnknownException__, __InvalidSignatureException__

__InputErrors__ will be raised whenever the API detects an error in your request (status code 400).
If you catch such an error, you can get its elements to verify each of the
individual errors that were detected in your request by the API.
For example:

```javascript
const starkbank = require('starkbank');


(async()=>{
    try{
        let transactions = await starkbank.transaction.create([
            starkbank.Transaction({
                amount: 99999999999999,  // (R$ 1.00)
                receiverId: "1029378109327810",
                description: ".",
                externalId: "12345",  // so we can block anything you send twice by mistake
                tags: ["provider"]
            }),
        ]);
    } catch (e){
        if (e instanceof InputErrors) {
            for (error of e.errors){
                console.log(error.code, error.message);
            }
        } else {
            throw e;
        }
    }
})();
```

__InternalServerError__ will be raised if the API runs into an internal error.
If you ever stumble upon this one, rest assured that the development team
is already rushing in to fix the mistake and get you back up to speed.

__UnknownException__ will be raised if a request encounters an error that is
neither __InputErrors__ nor an __InternalServerError__, such as connectivity problems.

__InvalidSignatureException__ will be raised specifically by starkbank.webhook.event.parse()
when the provided content and signature do not check out with the Stark Bank public
key.

## Key pair generation

The SDK provides a helper to allow you to easily create ECDSA secp256k1 keys to use
within our API. If you ever need a new pair of keys, just run:

```javascript
const starkbank = require('starkbank');

let [privateKey, publicKey] = starkbank.key.create()

// or, to also save .pem files in a specific path
let [privateKey, publicKey] = starkbank.key.create("file/keys/")
```

NOTE: When you are creating a new Project, it is recommended that you create the
keys inside the infrastructure that will use it, in order to avoid risky internet
transmissions of your **private-key**. Then you can export the **public-key** alone to the
computer where it will be used in the new Project creation.


[API docs]: (https://docs.api.StarkBank.com/?version=v2)