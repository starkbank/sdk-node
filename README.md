# Stark Bank Node SDK Beta

Welcome to the Stark Bank Node SDK! This tool is made for Node 
developers who want to easily integrate with our API.
This SDK version is compatible with the Stark Bank API v2.

If you have no idea what Stark Bank is, check out our [website](https://www.starkbank.com/) 
and discover a world where receiving or making payments 
is as easy as sending a text message to your client!

## Help and Feedback

If you have any questions about our SDK, just email us your questions. 
We will respond you quickly, pinky promise. We are here to help you integrate with us ASAP. 
We also love feedback, so don't be shy about sharing your thoughts with us.

Email: developers@starkbank.com

## Supported Node Versions

This library supports the following Node versions:

* Node 10+

If you have specific version demands for your projects, feel free to contact us.

## Stark Bank API Reference

Feel free to take a look at our [API docs](https://www.starkbank.com/docs/api).

## Versioning

This project adheres to the following versioning pattern:

Given a version number MAJOR.MINOR.PATCH, increment:

- MAJOR version when the **API** version is incremented. This may include backwards incompatible changes;
- MINOR version when **breaking changes** are introduced OR **new functionalities** are added in a backwards compatible manner;
- PATCH version when backwards compatible bug **fixes** are implemented.

## Setup

### 1. Install our SDK

1.1 To install the package with npm, run:

```sh
npm install starkbank
```

### 2. Create your Private and Public Keys

We use ECDSA. That means you need to generate a secp256k1 private
key to sign your requests to our API, and register your public key
with us so we can validate those requests.

You can use one of following methods:

2.1. Check out the options in our [tutorial](https://starkbank.com/faq/how-to-create-ecdsa-keys).

2.2. Use our SDK:

```javascript
const starkbank = require('starkbank');

let privateKey, publicKey;

[privateKey, publicKey] = starkbank.key.create();

// or, to also save .pem files in a specific path
[privateKey, publicKey] = starkbank.key.create('file/keys/');
```

### 3. Create a Project

You need a project for direct API integrations. To create one in Sandbox:

3.1. Log into [Starkbank Sandbox](https://sandbox.web.starkbank.com)

3.2. Go to Menu > Usuários (Users) > Projetos (Projects)

3.3. Create a Project: Give it a name and upload the public key you created in section 2.

3.4. After creating the Project, get its Project ID

3.5. Use the Project ID and private key to create the object below:

```javascript
const starkbank = require('starkbank');

// Get your private key from an environment variable or an encrypted database.
// This is only an example of a private key content. You should use your own key.
let privateKeyContent = `
-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIMCwW74H6egQkTiz87WDvLNm7fK/cA+ctA2vg/bbHx3woAcGBSuBBAAK
oUQDQgAE0iaeEHEgr3oTbCfh8U2L+r7zoaeOX964xaAnND5jATGpD/tHec6Oe9U1
IF16ZoTVt1FzZ8WkYQ3XomRD4HS13A==
-----END EC PRIVATE KEY-----
`;

let project = new starkbank.Project({
    environment: 'sandbox',
    id: '5656565656565656',
    privateKey: privateKeyContent
});
```

NOTE 1: Never hard-code your private key. Get it from an environment variable or an encrypted database.

NOTE 2: We support `'sandbox'` and `'production'` as environments.

NOTE 3: The project you created in `sandbox` does not exist in `production` and vice versa.


### 4. Setting up the user

There are two kinds of users that can access our API: **Project** and **Member**.

- `Member` is the one you use when you log into our webpage with your e-mail.
- `Project` is designed for integrations and is the one meant for our SDK.

There are two ways to inform the user to the SDK:
 
4.1 Passing the user as argument in all functions:

```javascript
const starkbank = require('starkbank');
(async() => {
    let balance = await starkbank.balance.get({user: project});
})();
```

4.2 Set it as a default user in the SDK:

```javascript
const starkbank = require('starkbank');

starkbank.user = project;

(async() => {
    let balance = await starkbank.balance.get();
})();
```

Just select the way of passing the project user that is more convenient to you.
On all following examples we will assume a default user has been set.

### 5. Setting up the error language

The error language can also be set in the same way as the default user:

```javascript
const starkbank = require('starkbank');

starkbank.language = 'en-US';
```

Language options are 'en-US' for english and 'pt-BR' for brazilian portuguese. English is default.

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

(async() => {
    let balance = await starkbank.balance.get();
    console.log(balance);
})();
```

### Create boletos

You can create boletos to charge customers or to receive money from accounts
you have in other banks.

```javascript
const starkbank = require('starkbank');

(async() => {
    let boletos = await starkbank.boleto.create([
        {
            amount: 23571,  // R$ 235,71 
            name: 'Buzz Aldrin',
            taxId: '012.345.678-90', 
            streetLine1: 'Av. Paulista, 200', 
            streetLine2: '10 andar',
            district: 'Bela Vista', 
            city: 'São Paulo',
            stateCode: 'SP',
            zipCode: '01310-000',
            due: '2020-04-30',
            fine: 5,  // 5%
            interest: 2.5,  // 2.5% per month
        },
    ]);

    for (let boleto of boletos) {
        console.log(boleto);
    }
})();
```

### Query boletos

You can get a list of created boletos given some filters.

```javascript
const starkbank = require('starkbank');

(async() => {
    let boletos = await starkbank.boleto.query({
        limit: 150,
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let boleto of boletos) {
        console.log(boleto);
    }
})();
```

### Get boleto

After its creation, information on a boleto may be retrieved by passing its id. 
Its status indicates whether it's been paid.

```javascript
const starkbank = require('starkbank');

(async() => {
    let boleto = await starkbank.boleto.get('5155165527080960')
    console.log(boleto);
})();
```

### Get boleto PDF

After its creation, a boleto PDF may be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.boleto.pdf('5155165527080960', { layout: 'default' });
    await fs.writeFile('boleto.pdf', pdf);
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

(async() => {
    let boleto = await starkbank.boleto.delete('5155165527080960');
    console.log(boleto);
})();
```

### Query boleto logs

Logs are pretty important to understand the life cycle of a boleto.

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.boleto.log.query({limit: 100});

    for await (let log of logs) {
        console.log(log);
    }
})();
```

### Get a boleto log

You can get a single log by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.boleto.log.get('5155165527080960');
    console.log(log);
})();
```

### Create transfers

You can also create transfers in the SDK (TED/DOC).

```javascript
const starkbank = require('starkbank');

(async() => {
    let transfers = await starkbank.transfer.create([
        {
            amount: 100,
            bankCode: '033',
            branchCode: '0001',
            accountNumber: '10000-0',
            taxId: '276.685.415-00',
            name: 'Tony Stark',
            tags: ['iron', 'suit']
        },
        {
            amount: 200,
            bankCode: '341',
            branchCode: '1234',
            accountNumber: '123456-7',
            taxId: '372.864.795-04',
            name: 'Jon Snow',
            scheduled: '2021-09-08',
            tags: []
        }
    ])

    for (let transfer of transfers) {
        console.log(transfer);
    }
})();
```

### Query transfers

You can query multiple transfers according to filters.

```javascript
const starkbank = require('starkbank');

(async() => {
    let transfers = await starkbank.transfer.query({
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let transfer of transfers) {
        console.log(transfer);
    }
})();
```

### Get transfer

To get a single transfer by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let transfer = await starkbank.transfer.get('5155165527080960');
    console.log(transfer);
})();
```

### Cancel a scheduled transfer

To cancel a single scheduled transfer by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let transfer = await starkbank.transfer.delete('5155165527080960');
    console.log(transfer);
})();
```

### Get transfer PDF

After its creation, a transfer PDF may also be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.transfer.pdf('5155165527080960');
    await fs.writeFile('transfer.pdf', pdf);
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

### Query transfer logs

You can query transfer logs to better understand transfer life cycles.

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.transfer.log.query({limit: 50});

    for await (let log of logs) {
        console.log(log);
    }
})();
```

### Get a transfer log

You can also get a specific log by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.transfer.log.get('5155165527080960');
    console.log(log);
})();
```

### Pay a boleto

Paying boletos is also simple.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.boletoPayment.create([
        {
            taxId: '012.345.678-90',
            description: 'take my money',
            scheduled: '2023-03-13',
            line: '34191.09008 64694.017308 71444.640008 1 96610000014500',
            tags: ['take', 'my', 'money'],
        },
        {
            taxId: '012.345.678-90',
            description: 'take my money one more time',
            scheduled: '2023-03-14',
            barCode: '34191972300000289001090064694197307144464000',
            tags: ['again'],
        },
    ])

    for (let payment of payments) {
        console.log(payment);
    }
})();
```

### Get boleto payment

To get a single boleto payment by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.boletoPayment.get('5155165527080960');
    console.log(payment);
})();
```

### Get boleto payment PDF

After its creation, a boleto payment PDF may be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.boletoPayment.pdf('5155165527080960');
    await fs.writeFile('boleto-payment.pdf', pdf);
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

(async() => {
    let payment = await starkbank.boletoPayment.delete('5155165527080960');
    console.log(payment);
})();
```

### Query boleto payments

You can search for boleto payments using filters. 

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.boletoPayment.query({
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

### Query boleto payment logs

Searches are also possible with boleto payment logs:

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.boletoPayment.log.query({
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let log of logs) {
        console.log(log);
    }
})();
```


### Get boleto payment log

You can also get a boleto payment log by specifying its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.boletoPayment.log.get('5155165527080960');
    console.log(log);
})();
```

### Investigate a boleto

You can discover if a StarkBank boleto has been recently paid before we receive the response on the next day.
This can be done by creating a BoletoHolmes object, which fetches the updated status of the corresponding
Boleto object according to CIP to check, for example, whether it is still payable or not.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.boletoHolmes.create([
        {
            boletoId: '5656565656565656'
        },
        {
            boletoId: '4848484848484848',
            tags: ['test']
        },
    ])

    for (let payment of payments) {
        console.log(payment);
    }
})();
```

### Get boleto holmes

To get a single Holmes by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let sherlock = await starkbank.boletoHolmes.get('5155165527080960');
    console.log(sherlock);
})();
```

### Query boleto holmes

You can search for boleto Holmes using filters. 

```javascript
const starkbank = require('starkbank');

(async() => {
    let holmes = await starkbank.boletoHolmes.query({
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let sherlock of holmes) {
        console.log(sherlock);
    }
})();
```

### Query boleto holmes logs

Searches are also possible with boleto holmes logs:

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.boletoHolmes.log.query({
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let log of logs) {
        console.log(log);
    }
})();
```

### Get boleto holmes log

You can also get a boleto holmes log by specifying its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.boletoHolmes.log.get('5155165527080960');
    console.log(log);
})();
```

### Create utility payment

Its also simple to pay utility bills (such electricity and water bills) in the SDK.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.utilityPayment.create([
        {
            line: '83680000001 7 08430138003 0 71070987611 8 00041351685 7',
            scheduled: '2020-03-13',
            description: 'take my money',
            tags: ['take', 'my', 'money'],
        },
        {
            barCode: '83600000001522801380037107172881100021296561',
            scheduled: '2020-03-14',
            description: 'take my money one more time',
            tags: ['again'],
        },
    ]);

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

### Query utility payments

To search for utility payments using filters, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.utilityPayment.query({
        tags: ['electricity', 'gas'],
    });

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

### Get utility payment

You can get a specific bill by its id:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.utilityPayment.get('5155165527080960');
    console.log(payment);
})();
```

### Get utility payment PDF

After its creation, a utility payment PDF may also be retrieved by passing its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.utilityPayment.pdf('5155165527080960');
    await fs.writeFile('utility-payment.pdf', pdf);
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

(async() => {
    let payment = await starkbank.utilityPayment.delete('5155165527080960');
    console.log(payment);
})();
```

### Query utility bill payment logs

You can search for payment logs by specifying filters. Use this to understand the
bills life cycles.

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.utilityPayment.log.query({
        paymentIds:['102893710982379182', '92837912873981273'],
    });

    for await (let log of logs) {
        console.log(log);
    }
})();
```

### Get utility bill payment log

If you want to get a specific payment log by its id, just run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.utilityPayment.log.get('5155165527080960');
    console.log(log);
})();
```

### Create transactions

To send money between Stark Bank accounts, you can create transactions:

```javascript
const starkbank = require('starkbank');

(async() => {
    let transactions = await starkbank.transaction.create([
        {
            amount: 100,  // (R$ 1.00)
            receiverId: '1029378109327810',
            description: 'Transaction to dear provider',
            externalId: '12345',  // so we can block anything you send twice by mistake
            tags: ['provider']
        },
        {
            amount: 234,  // (R$ 2.34)
            receiverId: '2093029347820947',
            description: 'Transaction to the other provider',
            externalId: '12346',  // so we can block anything you send twice by mistake
            tags: ['provider']
        },
    ])

    for (let transaction of transactions) {
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

(async() => {
    let transactions = await starkbank.transaction.query({
        after: '2020-01-01',
        before: '2020-03-01',
    });

    for await (let transaction of transactions) {
        console.log(transaction);
    }
})();
```

### Get transaction

You can get a specific transaction by its id:

```javascript
const starkbank = require('starkbank');

(async() => {
    let transaction = await starkbank.transaction.get('5155165527080960');
    console.log(transaction);
})();
```

### Create payment requests to be approved by authorized people in a cost center 

You can also request payments that must pass through a specific cost center approval flow to be executed.
In certain structures, this allows double checks for cash-outs and also gives time to load your account
with the required amount before the payments take place.
The approvals can be granted at our website and must be performed according to the rules
specified in the cost center.

**Note**: The value of the centerId parameter can be consulted by logging into our website and going
to the desired Cost Center page.

```javascript
const starkbank = require('starkbank');
const random = require('./random.js');

let transaction = new starkbank.Transaction({
    amount: 100, 
    receiverId: '4888651368497152',
    description: 'this is my cashback',
    externalId: '12345',
    tags: ['provider']
});

let requests = [
    new starkbank.PaymentRequest({
        centerId: '5967314465849344',
        payment: transaction,
        due: random.futureDate(0)
    })
];

(async() => {
    requests = await starkbank.paymentRequest.create(requests);

    for await (let request of requests){
        console.log(request);
    }
})();
```

**Note**: Instead of using PaymentRequest objects, you can also pass each request element in dictionary format

### Query payment requests

To search for payment requests, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let requests = await starkbank.paymentRequest.query({centerId: '5967314465849344', limit: 10});

    for await (let request of requests){
        console.log(request);
    }
})();
```

### Create webhook subscription

To create a webhook subscription and be notified whenever an event occurs, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let webhook = await starkbank.webhook.create({
        url: 'https://webhook.site/dd784f26-1d6a-4ca6-81cb-fda0267761ec',
        subscriptions: ['transfer', 'boleto', 'boleto-payment', 'utility-payment'],
    });

    console.log(webhook);
})();
```

### Query webhooks

To search for registered webhooks, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let webhooks = await starkbank.webhook.query();

    for await (let webhook of webhooks) {
        console.log(webhook);
    }
})();
```

### Get webhook

You can get a specific webhook by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let webhook = await starkbank.webhook.get('5155165527080960');
    console.log(webhook);
})();
```

### Delete webhook

You can also delete a specific webhook by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let webhook = await starkbank.webhook.delete('5155165527080960');
    console.log(webhook);
})();
```

### Process webhook events

Its easy to process events that arrived in your webhook. Remember to pass the
signature header so the SDK can make sure its really StarkBank that sent you
the event.

```javascript
const starkbank = require('starkbank');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.text({type: '*/*'}));

app.use(express.json())
const port = 3000
app.post('/', async (req, res) => {
    try {
        let event = await starkbank.event.parse({
            content: req.body,
            signature: req.headers['Digital-Signature']
        });
        if (event.subscription === 'transfer') {
            console.log(event.log.transfer);
        } else if (event.subscription === 'boleto') {
            console.log(event.log.boleto);
        } else if (event.subscription === 'boleto-payment') {
            console.log(event.log.payment);
        } else if (event.subscription === 'utility-payment') {
            console.log(event.log.payment);
        }
        res.end()
    }
    catch (err) {
        console.log(err)
        res.status(400).end()
    }
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

### Query webhook events

To search for webhooks events, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let events = await starkbank.event.query({
        after: '2020-01-01',
        before: '2020-03-01',
    });

    for await (let event of events) {
        console.log(event);
    }
})();
```

### Get webhook event

You can get a specific webhook event by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let event = await starkbank.event.get('5155165527080960');
    console.log(event);
})();
```

### Delete webhook event

You can also delete a specific webhook event by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let event = await starkbank.event.delete('5155165527080960');
    console.log(event);
})();
```

### Set webhook events as delivered

This can be used in case you've lost events.
With this function, you can manually set events retrieved from the API as
'delivered' to help future event queries with `isDelivered=false`.

```javascript
const starkbank = require('starkbank');

(async() => {
    let event = await starkbank.event.update('5155165527080960', {isDelivered: true});
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
const { InputErrors } = starkbank.errors;

(async() => {
    try{
        let transactions = await starkbank.transaction.create([
            {
                amount: 100, 
                receiverId: '1029378109327810',
                description: '.',
                externalId: '12345',
                tags: ['provider']
            },
        ]);
    } catch (e) {
        if (e instanceof InputErrors) {
            for (error of e.errors) {
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

__InvalidSignatureException__ will be raised specifically by starkbank.event.parse()
when the provided content and signature do not check out with the Stark Bank public
key.
