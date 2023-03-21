# Stark Bank Node SDK

Welcome to the Stark Bank Node SDK! This tool is made for Node
developers who want to easily integrate with our API.
This SDK version is compatible with the Stark Bank API v2.

If you have no idea what Stark Bank is, check out our [website](https://www.starkbank.com/)
and discover a world where receiving or making payments
is as easy as sending a text message to your client!

# Introduction

# Index

- [Introduction](#introduction)
    - [Supported Node versions](#supported-node-versions)
    - [API documentation](#stark-bank-api-documentation)
    - [Versioning](#versioning)
- [Setup](#setup)
    - [Install our SDK](#1-install-our-sdk)
    - [Create your Private and Public Keys](#2-create-your-private-and-public-keys)
    - [Register your user credentials](#3-register-your-user-credentials)
    - [Setting up the user](#4-setting-up-the-user)
    - [Setting up the error language](#5-setting-up-the-error-language)
    - [Resource listing and manual pagination](#6-resource-listing-and-manual-pagination)
- [Testing in Sandbox](#testing-in-sandbox) 
- [Usage](#usage)
    - [Transactions](#create-transactions): Account statement entries
    - [Balance](#get-balance): Account balance
    - [Transfers](#create-transfers): Wire transfers (TED and manual Pix)
    - [DictKeys](#get-dict-key): Pix Key queries to use with Transfers
    - [Institutions](#query-bacen-institutions): Institutions recognized by the Central Bank
    - [Invoices](#create-invoices): Reconciled receivables (dynamic Pix QR Codes)
    - [DynamicBrcode](#create-dynamicbrcodes): Simplified reconciled receivables (dynamic Pix QR Codes)
    - [Deposits](#query-deposits): Other cash-ins (static Pix QR Codes, DynamicBrcodes, manual Pix, etc)
    - [Boletos](#create-boletos): Boleto receivables
    - [BoletoHolmes](#investigate-a-boleto): Boleto receivables investigator
    - [BrcodePayments](#pay-a-br-code): Pay Pix QR Codes
    - [BoletoPayments](#pay-a-boleto): Pay Boletos
    - [UtilityPayments](#create-utility-payments): Pay Utility bills (water, light, etc.)
    - [TaxPayments](#create-tax-payment): Pay taxes
    - [DarfPayments](#create-darf-payment): Pay DARFs
    - [PaymentPreviews](#preview-payment-information-before-executing-the-payment): Preview all sorts of payments
    - [PaymentRequest](#create-payment-requests-to-be-approved-by-authorized-people-in-a-cost-center): Request a payment approval to a cost center
    - [Webhooks](#create-a-webhook-subscription): Configure your webhook endpoints and subscriptions
    - [WebhookEvents](#process-webhook-events): Manage webhook events
    - [WebhookEventAttempts](#query-failed-webhook-event-delivery-attempts-information): Query failed webhook event deliveries
    - [Workspaces](#create-a-new-workspace): Manage your accounts
- [Handling errors](#handling-errors)
- [Help and Feedback](#help-and-feedback)

# Supported Node Versions

This library supports the following Node versions:

* Node 10+

If you have specific version demands for your projects, feel free to contact us.

# Stark Bank API documentation

Feel free to take a look at our [API docs](https://www.starkbank.com/docs/api).

# Versioning

This project adheres to the following versioning pattern:

Given a version number MAJOR.MINOR.PATCH, increment:

- MAJOR version when the **API** version is incremented. This may include backwards incompatible changes;
- MINOR version when **breaking changes** are introduced OR **new functionalities** are added in a backwards compatible manner;
- PATCH version when backwards compatible bug **fixes** are implemented.

# Setup

## 1. Install our SDK

1.1 To install the package with npm, run:

```sh
npm install starkbank
```

## 2. Create your Private and Public Keys

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

## 3. Register your user credentials

You can interact directly with our API using two types of users: Projects and Organizations.

- **Projects** are workspace-specific users, that is, they are bound to the workspaces they are created in.
One workspace can have multiple Projects.
- **Organizations** are general users that control your entire organization.
They can control all your Workspaces and even create new ones. The Organization is bound to your company's tax ID only.
Since this user is unique in your entire organization, only one credential can be linked to it.

3.1. To create a Project in Sandbox:

3.1.1. Log into [Starkbank Sandbox](https://web.sandbox.starkbank.com)

3.1.2. Go to Menu > Integrations

3.1.3. Click on the "New Project" button

3.1.4. Create a Project: Give it a name and upload the public key you created in section 2

3.1.5. After creating the Project, get its Project ID

3.1.6. Use the Project ID and private key to create the object below:

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

3.2. To create Organization credentials in Sandbox:

3.2.1. Log into [Starkbank Sandbox](https://web.sandbox.starkbank.com)

3.2.2. Go to Menu > Integrations

3.2.3. Click on the "Organization public key" button

3.2.4. Upload the public key you created in section 2 (only a legal representative of the organization can upload the public key)

3.2.5. Click on your profile picture and then on the "Organization" menu to get the Organization ID

3.2.6. Use the Organization ID and private key to create the object below:

```javascript
const starkbank = require('starkbank');

//  Get your private key from an environment variable or an encrypted database.
//  This is only an example of a private key content. You should use your own key.
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

let organization = new starkbank.Organization({
    id: '5656565656565656',
    privateKey: privateKeyContent,
    environment: 'sandbox',
    workspaceId: null // You only need to set the workspaceId when you are operating a specific workspaceId
});


// To dynamically use your organization credentials in a specific workspaceId,
// you can use the organization.replace() method:
(async() => {
    let balance = await starkbank.balance.get({
        user: starkbank.organization.replace(organization, '4848484848484848')
    });
    console.log(balance);
})();
```

NOTE 1: Never hard-code your private key. Get it from an environment variable or an encrypted database.

NOTE 2: We support `'sandbox'` and `'production'` as environments.

NOTE 3: The credentials you registered in `sandbox` do not exist in `production` and vice versa.


## 4. Setting up the user

There are three kinds of users that can access our API: **Organization**, **Project** and **Member**.

- `Project` and `Organization` are designed for integrations and are the ones meant for our SDKs.
- `Member` is the one you use when you log into our webpage with your e-mail.

There are two ways to inform the user to the SDK:

4.1 Passing the user as argument in all functions:

```javascript
const starkbank = require('starkbank');
(async() => {
    let balance = await starkbank.balance.get({user: project}); // or organization
})();
```

4.2 Set it as a default user in the SDK:

```javascript
const starkbank = require('starkbank');

starkbank.user = project; // or organization

(async() => {
    let balance = await starkbank.balance.get();
})();
```

And now you can use module import with setUser:

```javascript
import * as starkbank from 'starkbank';

starkbank.setUser(project); // or organization

(async() => {
    let balance = await starkbank.balance.get();
})();
```

Just select the way of passing the user that is more convenient to you.
On all following examples we will assume a default user has been set.

## 5. Setting up the error language

The error language can also be set in the same way as the default user:

```javascript
const starkbank = require('starkbank');

starkbank.language = 'en-US';
```

Language options are 'en-US' for english and 'pt-BR' for brazilian portuguese. English is default.

## 6. Resource listing and manual pagination

Almost all SDK resources provide a `query` and a `page` function.

- The `query` function provides a straight forward way to efficiently iterate through all results that match the filters you inform,
seamlessly retrieving the next batch of elements from the API only when you reach the end of the current batch.
If you are not worried about data volume or processing time, this is the way to go.

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

- The `page` function gives you full control over the API pagination. With each function call, you receive up to
100 results and the cursor to retrieve the next batch of elements. This allows you to stop your queries and
pick up from where you left off whenever it is convenient. When there are no more elements to be retrieved, the returned cursor will be `null`.

```javascript
const starkbank = require('starkbank');

(async() => {
    let cursor = null;
    let page = null;
    while (true) {
        [page, cursor] = await starkbank.transaction.page({ limit: 5, cursor: cursor });
        for (let transaction of page) {
            console.log(transaction);
        }
        if (cursor == null) {
            break;
        }
    }
})();
```

To simplify the following SDK examples, we will only use the `query` function, but feel free to use `page` instead.

# Testing in Sandbox

Your initial balance is zero. For many operations in Stark Bank, you'll need funds
in your account, which can be added to your balance by creating an Invoice or a Boleto.

In the Sandbox environment, most of the created Invoices and Boletos will be automatically paid,
so there's nothing else you need to do to add funds to your account. Just create
a few Invoices and wait around a bit.

In Production, you (or one of your clients) will need to actually pay this Invoice or Boleto
for the value to be credited to your account.


# Usage

Here are a few examples on how to use the SDK. If you have any doubts, use the built-in
`help()` function to get more info on the desired functionality
(for example: `help(starkbank.boleto.create)`)

## Create transactions

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

**Note**: Instead of using dictionary objects, you can also pass each invoice element in the native Transaction object format

## Query transactions

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

## Get a transaction

You can get a specific transaction by its id:

```javascript
const starkbank = require('starkbank');

(async() => {
    let transaction = await starkbank.transaction.get('5155165527080960');
    console.log(transaction);
})();
```

## Get balance

To know how much money you have in your workspace, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let balance = await starkbank.balance.get();
    console.log(balance);
})();
```

## Create transfers

You can also create transfers in the SDK (TED/Pix) and configure transfer behavior according to its rules.

```javascript
const starkbank = require('starkbank');

(async() => {
    let transfers = await starkbank.transfer.create([
        {
            amount: 100,
            bankCode: '20018183',  // Pix
            branchCode: '0001',
            accountNumber: '10000-0',
            accountType: "salary",
            externalId: "my-internal-id-12345",
            taxId: '276.685.415-00',
            name: 'Tony Stark',
            tags: ['iron', 'suit']
        },
        {
            amount: 200,
            bankCode: '341',  // TED
            branchCode: '1234',
            accountNumber: '123456-7',
            taxId: '372.864.795-04',
            name: 'Jon Snow',
            scheduled: '2021-09-08',
            tags: [],
            rules: [
                new starkbank.transfer.Rule({
                    key: "resendingLimit",  // Set maximum number of retries if Transfer fails due to systemic issues at the receiver bank
                    value: 5                // Our resending limit is 10 by default
                }) 
            ] 
        }
    ])

    for (let transfer of transfers) {
        console.log(transfer);
    }
})();
```

**Note**: Instead of using dictionary objects, you can also pass each invoice element in the native Transfer object format

## Query transfers

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

## Get a transfer

To get a single transfer by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let transfer = await starkbank.transfer.get('5155165527080960');
    console.log(transfer);
})();
```

## Cancel a scheduled transfer

To cancel a single scheduled transfer by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let transfer = await starkbank.transfer.delete('5155165527080960');
    console.log(transfer);
})();
```

## Get a transfer PDF

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

## Query transfer logs

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

## Get a transfer log

You can also get a specific log by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.transfer.log.get('5155165527080960');
    console.log(log);
})();
```

## Get DICT key

You can get DICT (Pix) key's parameters by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
      let dictKey = await starkbank.dictKey.get('tony@starkbank.com');
      console.log(dictKey);
})();
```

## Query your DICT keys

To take a look at the DICT keys linked to your workspace, just run the following:

```javascript
const starkbank = require('starkbank');

(async() => {
    let dictKeys = await starkbank.dictKey.query({
        limit: 5,
        status: 'registered',
        type: 'evp'
    });

    for await (let dictKey of dictKeys) {
        console.log(dictKey);
    }
})();
```

## Query Bacen institutions

You can query institutions registered by the Brazilian Central Bank for Pix and TED transactions.

```javascript
const starkbank = require('starkbank');

(async() => {
    let institutions = await starkbank.institution.query({ limit: 5, search: 'stark' });
    for (let institution of institutions) {
        console.log(institution);
    }
})();
```

## Create invoices

You can create dynamic QR Code invoices to charge customers or to receive money from accounts you have in other banks. 

Since the banking system only understands value modifiers (discounts, fines and interest) when dealing with **dates** (instead of **datetimes**), these values will only show up in the end user banking interface if you use **dates** in the "due" and "discounts" fields. 

If you use **datetimes** instead, our system will apply the value modifiers in the same manner, but the end user will only see the final value to be paid on his interface.

Also, other banks will most likely only allow payment scheduling on invoices defined with **dates** instead of **datetimes**.

```javascript
const starkbank = require('starkbank');

(async() => {
    let invoices = await starkbank.invoice.create([
        {
            amount: 248,
            descriptions: [
                {
                    'key': 'Arya',
                    'value': 'Not today'
                }
            ],
            discounts: [
                {
                    'percentage': 10,
                    'due': '2020-11-25T17:59:26.249976+00:00'
                }
            ],
            due: '2020-11-29T17:59:26.249976+00:00',
            expiration: 123456789,
            fine: 2.5,
            interest: 1.3,
            name: 'Arya Stark',
            tags: [
                'New sword',
                'Invoice #1234'
            ],
            taxId: '29.176.331/0001-69'
        }
    ]);

    for (let invoice of invoices) {
        console.log(invoice);
    }
})();
```

**Note**: Instead of using dictionary objects, you can also pass each invoice element in the native Invoice object format

## Get an invoice

After its creation, information on an invoice may be retrieved by its id.
Its status indicates whether it's been paid.

```javascript
const starkbank = require('starkbank');

(async() => {
    let invoice = await starkbank.invoice.get('5400193516175360')
    console.log(invoice);
})();
```

## Get an invoice QR Code

After its creation, an invoice QR Code png file blob may be retrieved by its id.

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let png = await starkbank.invoice.qrcode('5400193516175360')

    await fs.writeFile('invoice.png', png);
})();
```
Be careful not to accidentally enforce any encoding on the raw png content,
as it may yield abnormal results in the final file.

## Get an invoice PDF

After its creation, an invoice PDF may be retrieved by its id.

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.invoice.pdf('5400193516175360')

    await fs.writeFile('invoice.pdf', pdf);
})();
```
Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

## Cancel an invoice

You can also cancel an invoice by its id.
Note that this is not possible if it has been paid already.

```javascript
const starkbank = require('starkbank');

(async() => {
    let invoice = await starkbank.invoice.update('5047198572085248', {status: 'canceled'});
    console.log(invoice);
})();
```

## Update an invoice

You can update an invoice's amount, due date and expiration by its id.
If the invoice has already been paid, only the amount can be
decreased, which will result in a payment reversal. To fully reverse 
the invoice, pass amount: 0.

```javascript
const starkbank = require('starkbank');

(async() => {
    let invoice = await starkbank.invoice.update(
        '5047198572085248',
        {
            amount: 1000,
            due: '2020-12-25T17:59:26.249976+00:00',
            expiration: 123456  // in seconds
        }
    );

    console.log(invoice);
})();
```

## Query invoices

You can get a list of created invoices given some filters.

```javascript
const starkbank = require('starkbank');

(async() => {
    let invoices = await starkbank.invoice.query({
        limit: 5,
        after: '2020-04-01',
        before: '2020-11-30',
        status: 'paid'
    });

    for await (let invoice of invoices) {
        console.log(invoice);
    }
})();
```

## Query invoice logs

Logs are pretty important to understand the life cycle of an invoice.

```javascript
const starkbank = require('starkbank');

(async() => {
    let invoices = await starkbank.invoice.log.query({limit: 10});

    for await (let invoice of invoices) {
        console.log(invoice);
    }
})();
```

## Get an invoice log

You can get a single log by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let invoice = await starkbank.invoice.log.get('5400193516175360')
    console.log(invoice);
})();
```

## Get a reversed invoice log PDF

 Whenever an Invoice is successfully reversed, a reversed log will be created.
 To retrieve a specific reversal receipt, you can request the corresponding log PDF:

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.invoice.log.pdf('5400193516175360')
    await fs.writeFile('invoice-log.pdf', pdf);
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

## Get an invoice payment information

 Once an invoice has been paid, you can get the payment information using the Invoice.Payment sub-resource:

```javascript
const starkbank = require('starkbank');

(async() => {
    let paymentInformation = starkbank.invoice.payment("5155165527080960")
    console.log(paymentInformation);
})();
```

## Create DynamicBrcodes

You can create simplified dynamic QR Codes to receive money using Pix transactions.
When a DynamicBrcode is paid, a Deposit is created with the tags parameter containing the character “dynamic-brcode/” followed by the DynamicBrcode’s uuid "dynamic-brcode/{uuid}" for conciliation.

The differences between an Invoice and the DynamicBrcode are the following:

|                       | Invoice | DynamicBrcode |
|-----------------------|:-------:|:-------------:|
| Expiration            |    ✓    |       ✓       |
| Can only be paid once |    ✓    |       ✓       |
| Due, fine and fee     |    ✓    |       X       |
| Discount              |    ✓    |       X       |
| Description           |    ✓    |       X       |
| Can be updated        |    ✓    |       X       |

**Note:** In order to check if a BR code has expired, you must first calculate its expiration date (add the expiration to the creation date).
**Note:** To know if the BR code has been paid, you need to query your Deposits by the tag "dynamic-brcode/{uuid}" to check if it has been paid.

```javascript
const starkbank = require('starkbank');

(async() => {
    const brcodes = await starkbank.dynamicBrcode.create([
        {
            amount: 23571,      // R$ 235,71 
            expiration: 3 * 3600
        },
        {
            amount: 23571,      // R$ 235,71 
            expiration: 3 * 3600
        }
    ])
    
    for await (let brcode of brcodes) {
        console.log(brcode);
    }
})();
```

**Note**: Instead of using DynamicBrcode objects, you can also pass each brcode element in dictionary format

## Get a DynamicBrcode

After its creation, information on a DynamicBrcode may be retrieved by its uuid.

```javascript
const starkbank = require('starkbank');

(async() => {
    let brcode = await starkbank.dynamicBrcode.get('bb9cd43ea6f4403391bf7ef6aa876600')
    console.log(brcode);
})();
```

## Query DynamicBrcodes

You can get a list of created DynamicBrcodes given some filters.

```javascript
const starkbank = require('starkbank');

(async() => {
    let brcodes = await starkbank.dynamicBrcode.query({
        after: '2023-01-01',
        before: '2023-03-01',
    });

    for await (let brcode of brcodes) {
        console.log(brcode);
    }
})();
```

## Query deposits

You can get a list of created deposits given some filters.

```javascript
const starkbank = require('starkbank');

(async() => {
    let deposits = await starkbank.deposit.query({
        limit: 5,
        after: '2020-04-01',
        before: '2020-11-30',
    });

    for await (let deposit of deposits) {
        console.log(deposit);
    }
})();
```

## Get a deposit

After its creation, information on a deposit may be retrieved by its id. 

```javascript
const starkbank = require('starkbank');

(async() => {
    let deposit = await starkbank.deposit.get('5400193516175360')
    console.log(deposit);
})();
```

## Query deposit logs

Logs are pretty important to understand the life cycle of a deposit.

```javascript
const starkbank = require('starkbank');

(async() => {
    let deposits = await starkbank.deposit.log.query({limit: 10});

    for await (let deposit of deposits) {
        console.log(deposit);
    }
})();
```

## Get a deposit log

You can get a single log by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let deposit = await starkbank.deposit.log.get('5400193516175360')
    console.log(deposit);
})();
```

## Create boletos

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

**Note**: Instead of using dictionary objects, you can also pass each invoice element in the native Boleto object format

## Query boletos

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

## Get a boleto

After its creation, information on a boleto may be retrieved by passing its id.
Its status indicates whether it's been paid.

```javascript
const starkbank = require('starkbank');

(async() => {
    let boleto = await starkbank.boleto.get('5155165527080960')
    console.log(boleto);
})();
```

## Get a boleto PDF

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

## Delete a boleto

You can also cancel a boleto by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async() => {
    let boleto = await starkbank.boleto.delete('5155165527080960');
    console.log(boleto);
})();
```

## Query boleto logs

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

## Get a boleto log

You can get a single log by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.boleto.log.get('5155165527080960');
    console.log(log);
})();
```

## Investigate a boleto

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

## Get a boleto holmes

To get a single boleto holmes by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let sherlock = await starkbank.boletoHolmes.get('5155165527080960');
    console.log(sherlock);
})();
```

## Query boleto holmes

You can search for boleto holmes using filters. 

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

## Query boleto holmes logs

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

## Get a boleto holmes log

You can also get a boleto holmes log by specifying its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.boletoHolmes.log.get('5155165527080960');
    console.log(log);
})();
```

## Pay a BR Code

Paying a BR Code is also simple.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.brcodePayment.create([
        {
            brcode: "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A",
            taxId: '20.018.183/0001-80',
            description: "Tony Stark's Suit",
            amount: 7654321,
            scheduled: '2020-02-29',
            tags: ['Stark', 'Suit'],
            rules: [
                new starkbank.brcodePayment.Rule({
                    key: "resendingLimit",  // Set maximum number of retries if Payment fails due to systemic issues at the receiver bank
                    value: 5                // Our resending limit is 10 by default
                })
            ]
        },
    ]);

    for (let payment of payments) {
        console.log(payment);
    }
})();
```

**Note**: You can also configure payment behavior according to its rules
**Note**: Instead of using dictionary objects, you can also pass each invoice element in the native BrcodePayment object format

## Get a BR Code payment

To get a single BR Code payment by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.brcodePayment.get('5155165527080960')
    console.log(payment);
})();
```

## Get a BR Code payment PDF

After its creation, a BR Code payment PDF may be retrieved by its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.brcodePayment.pdf('5155165527080960', { layout: 'default' });
    await fs.writeFile('brcode-payment.pdf', pdf);
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

## Cancel a BR Code payment

You can cancel a BR Code payment by changing its status to "canceled".
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.brcodePayment.update('5047198572085248', {status: 'canceled'});
    console.log(payment);
})();
```

## Query BR Code payments

You can search for BR Code payments using filters. 

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.brcodePayment.query({
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

## Query BR Code payment logs

Searches are also possible with BR Code payment logs:

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.brcodePayment.log.query({
        after: '2020-03-01',
        before: '2020-03-30',
    });

    for await (let log of logs) {
        console.log(log);
    }
})();
```

## Get a BR Code payment log

You can also get a BR Code payment log by specifying its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.brcodePayment.log.get('5155165527080960');
    console.log(log);
})();
```

## Pay a boleto

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

## Get a boleto payment

To get a single boleto payment by its id, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.boletoPayment.get('5155165527080960');
    console.log(payment);
})();
```

## Get a boleto payment PDF

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

## Delete a boleto payment

You can also cancel a boleto payment by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.boletoPayment.delete('5155165527080960');
    console.log(payment);
})();
```

## Query boleto payments

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

## Query boleto payment logs

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

## Get a boleto payment log

You can also get a boleto payment log by specifying its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.boletoPayment.log.get('5155165527080960');
    console.log(log);
})();
```

## Create utility payments

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

**Note**: Instead of using dictionary objects, you can also pass each invoice element in the native UtilityPayment object format

## Query utility payments

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

## Get a utility payment

You can get a specific bill by its id:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.utilityPayment.get('5155165527080960');
    console.log(payment);
})();
```

## Get a utility payment PDF

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

## Delete a utility payment

You can also cancel a utility payment by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.utilityPayment.delete('5155165527080960');
    console.log(payment);
})();
```

## Query utility payment logs

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

## Get a utility payment log

If you want to get a specific payment log by its id, just run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.utilityPayment.log.get('5155165527080960');
    console.log(log);
})();
```

## Create tax payment

Its also simple to pay taxes (such as ISS and DAS) in the SDK.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.taxPayment.create([
        {
            line: '85800000003 0 28960328203 1 56072020190 5 22109674804 0',
            scheduled: '2020-08-14',
            description: 'build the hospital, hopefully',
            tags: ['expensive'],
        },
        {
            barCode: '83660000001084301380074119002551100010601813',
            scheduled: '2020-08-13',
            description: 'fix the road',
            tags: ['take', 'my', 'money'],
        },
    ]);

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

**Note**: Instead of using TaxPayment objects, you can also pass each payment element in dictionary format

## Query tax payments

To search for tax payments using filters, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.taxPayment.query({
        tags: ['das', 'july'],
    });

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

## Get a tax payment

You can get a specific bill by its id:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.taxPayment.get('5155165527080960');
    console.log(payment);
})();
```

## Get a tax payment PDF

After its creation, a tax payment PDF may also be retrieved by its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.taxPayment.pdf('5155165527080960');
    await fs.writeFile('tax-payment.pdf', pdf);
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

## Delete a tax payment

You can also cancel a tax payment by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.taxPayment.delete('5155165527080960');
    console.log(payment);
})();
```

## Query tax payment logs

You can search for payments by specifying filters. Use this to understand the
bills life cycles.

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.taxPayment.log.query({
        paymentIds:['102893710982379182', '92837912873981273'],
    });

    for await (let log of logs) {
        console.log(log);
    }
})();
```

## Get a tax payment log

If you want to get a specific payment log by its id, just run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.taxPayment.log.get('5155165527080960');
    console.log(log);
})();
```

**Note**: Some taxes can't be payed with bar codes. Since they have specific parameters, each one of them has its own
 resource and routes, which are all analogous to the TaxPayment resource. The ones we currently support are:
 - DarfPayment, for DARFs

## Create DARF payment

If you want to manually pay DARFs without barcodes, you may create DarfPayments:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.darfPayment.create([
        {
            revenueCode: "1240",
            taxId: "012.345.678-90",
            competence: "2023-09-01",
            referenceNumber: "2340978970",
            nominalAmount: 1234,
            fineAmount: 12,
            interestAmount: 34,
            due: "2023-03-10",
            scheduled: "2023-03-10",
            tags: ["DARF", "making money"],
            description: "take my money",
        }
    ]);

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

**Note**: Instead of using DarfPayment objects, you can also pass each payment element in dictionary format

## Query DARF payments

To search for DARF payments using filters, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payments = await starkbank.darfPayment.query({
        tags: ["darf", "july"]
    });

    for await (let payment of payments) {
        console.log(payment);
    }
})();
```

## Get DARF payment

You can get a specific DARF payment by its id:

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.darfPayment.get('5155165527080960');
    console.log(payment);
})();
```

## Get DARF payment PDF

After its creation, a DARF payment PDF may also be retrieved by its id. 

```javascript
const starkbank = require('starkbank');
const fs = require('fs').promises;

(async() => {
    let pdf = await starkbank.darfPayment.pdf('5155165527080960');
    await fs.writeFile('tax-payment.pdf', pdf);
})();
```

Be careful not to accidentally enforce any encoding on the raw pdf content,
as it may yield abnormal results in the final file, such as missing images
and strange characters.

## Delete DARF payment

You can also cancel a DARF payment by its id.
Note that this is not possible if it has been processed already.

```javascript
const starkbank = require('starkbank');

(async() => {
    let payment = await starkbank.darfPayment.delete('5155165527080960');
    console.log(payment);
})();
```

## Query DARF payment logs

You can search for payment logs by specifying filters. Use this to understand each payment life cycle.

```javascript
const starkbank = require('starkbank');

(async() => {
    let logs = await starkbank.darfPayment.log.query({
        limit: 10
    });

    for await (let log of logs) {
        console.log(log);
    }
})();
```

## Get DARF payment log

If you want to get a specific payment log by its id, just run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let log = await starkbank.darfPayment.log.get('1902837198237992');
    console.log(log);
})();
```

## Preview payment information before executing the payment

You can preview multiple types of payment to confirm any information before actually paying.
If the 'scheduled' parameter is not informed, today will be assumed as the intended payment date.
Right now, the 'scheduled' parameter only has effect on BrcodePreviews.
This resource is able to preview the following types of payment:
'brcode-payment', 'boleto-payment', 'utility-payment' and 'tax-payment'

```js
const starkbank = require('starkbank');

(async() => {
    let previews = await starkbank.paymentPreview.create([
        new starkbank.PaymentPreview({ 
            id: "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbff817b5a8520400005303986540510.005802BR5908T'Challa6009Sao Paulo62090505123456304B14A",
            scheduled: '2021-08-30'
        }),
        new starkbank.PaymentPreview({ 
            id: '34191.09008 61207.727308 71444.640008 5 81310001234321'
        })
    ]);

    for (let preview of previews) {
        console.log(preview);
    }
})();
```

**Note**: Instead of using PaymentPreview objects, you can also pass each request element in dictionary format

## Create payment requests to be approved by authorized people in a cost center

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
        due: "2020-08-03"
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

## Query payment requests

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

## Create a webhook subscription

To create a webhook subscription and be notified whenever an event occurs, run:

```javascript
const starkbank = require('starkbank');

(async() => {
    let webhook = await starkbank.webhook.create({
        url: 'https://webhook.site/dd784f26-1d6a-4ca6-81cb-fda0267761ec',
        subscriptions: ['transfer', 'boleto', 'boleto-payment', 'boleto-holmes', 'brcode-payment', 'utility-payment', 'deposit', 'invoice'],
    });

    console.log(webhook);
})();
```

## Query webhook subscriptions

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

## Get a webhook subscription

You can get a specific webhook by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let webhook = await starkbank.webhook.get('5155165527080960');
    console.log(webhook);
})();
```

## Delete a webhook subscription

You can also delete a specific webhook by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let webhook = await starkbank.webhook.delete('5155165527080960');
    console.log(webhook);
})();
```

## Process webhook events

Its easy to process events that arrived in your webhook. Remember to pass the
signature header so the SDK can make sure its really StarkBank that sent you
the event.

```javascript
const starkbank = require('starkbank');
const express = require('express')
const app = express()

app.use(express.raw({type: "*/*"}));

const port = 3000
app.post('/', async (req, res) => {
    try {
        let event = await starkbank.event.parse({
            content: req.body.toString(),
            signature: req.headers['digital-signature']
        });
        if (event.subscription === 'transfer') {
            console.log(event.log.transfer);
        } else if (event.subscription === 'boleto') {
            console.log(event.log.boleto);
        } else if (event.subscription === 'boleto-payment') {
            console.log(event.log.payment);
        } else if (event.subscription === 'utility-payment') {
            console.log(event.log.payment);
        } else if (event.subscription === 'boleto-holmes') {
            console.log(event.log.holmes);
        } else if (event.subscription === 'brcode-payment') {
            console.log(event.log.payment);
        } else if (event.subscription === 'deposit') {
            console.log(event.log.deposit);
        } else if (event.subscription === 'invoice') {
            console.log(event.log.invoice);
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

## Query webhook events

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

## Get a webhook event

You can get a specific webhook event by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let event = await starkbank.event.get('5155165527080960');
    console.log(event);
})();
```

## Delete a webhook event

You can also delete a specific webhook event by its id.

```javascript
const starkbank = require('starkbank');

(async() => {
    let event = await starkbank.event.delete('5155165527080960');
    console.log(event);
})();
```

## Set webhook events as delivered

This can be used in case you've lost events.
With this function, you can manually set events retrieved from the API as
'delivered' to help future event queries with `isDelivered = false`.

```javascript
const starkbank = require('starkbank');

(async() => {
    let event = await starkbank.event.update('5155165527080960', {isDelivered: true});
    console.log(event);
})();
```

## Query failed webhook event delivery attempts information

You can also get information on failed webhook event delivery attempts.

```javascript
const starkbank = require('starkbank');

(async() => {
    let attempts = await starkbank.event.attempt.query(after="2020-03-20");

    for await (let attempt of attempts) {
        console.log(attempt.code);
        console.log(attempt.message);
    }
})();
```

## Get a failed webhook event delivery attempt information

To retrieve information on a single attempt, use the following function:

```javascript
const starkbank = require('starkbank');

(async() => {
    let attempt = await starkbank.event.attempt.get("1616161616161616")
    console.log(attempt);
})();
```

## Create a new Workspace

The Organization user allows you to create new Workspaces (bank accounts) under your organization.
Workspaces have independent balances, statements, operations and users.
The only link between your Workspaces is the Organization that controls them.

**Note**: This route will only work if the Organization user is used with `workspaceId = null`.

```javascript
const starkbank = require('starkbank');

(async() => {
    let workspace = await starkbank.workspace.create(
        {
            username: 'iron-bank-workspace-1',
            name: 'Iron Bank Workspace 1',
            allowedTaxIds: ['012.345.678-90', '20.018.183/0001-80'],
            user: organization,
        }
    );
})();

console.log(workspace);
```

## List your Workspaces

This route lists Workspaces. If no parameter is passed, all the workspaces the user has access to will be listed, but
you can also find other Workspaces by searching for their usernames or IDs directly.

```javascript
const starkbank = require('starkbank');

(async() => {
    let workspaces = await starkbank.workspace.query({limit = 30});

    for await (let workspace of workspaces) {
        console.log(workspace);
    }
})();
```

## Get a Workspace

You can get a specific Workspace by its id.

```javascript
const starkbank = require('starkbank');
(async() => {
    let workspace = await starkbank.workspace.get('1082736198236817');

    console.log(workspace);
})();
```

## Update a Workspace

You can update a specific Workspace by its id.

```javascript
const starkbank = require('starkbank');
const fs = require('fs');

(async() => {
    let file = fs.readFileSync('/path/to/file.png');

    let workspace = await starkbank.workspace.update('1082736198236817', {
        username: 'new-username',
        name: 'New Name',
        picture: file,
        pictureType: 'image/png',
        allowedTaxIds: ['012.345.678-90'],
        user: starkbank.organization.replace(exampleOrganization, workspaces[0].id)
    });
    console.log(workspace);
})();
```

You can also block a specific Workspace by its id.

```javascript
const starkbank = require('starkbank');
const fs = require('fs');

(async() => {
    let file = fs.readFileSync('/path/to/file.png');

    let workspace = await starkbank.workspace.update('1082736198236817', {
        status: "blocked",
        user: starkbank.organization.replace(exampleOrganization, workspaces[0].id)
    });
    console.log(workspace);
})();
```

**Note**: the Organization user can only update a workspace with the Workspace ID set.


# Handling errors

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

# Help and Feedback

If you have any questions about our SDK, just send us an email.
We will respond you quickly, pinky promise. We are here to help you integrate with us ASAP.
We also love feedback, so don't be shy about sharing your thoughts with us.

Email: help@starkbank.com
