const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;
const { Rule } = require('./rule/rule.js');
const { Split } = require('../split/split.js');
const subResource = require('../invoice/payment.js').subResource
const parseObjects = require('../utils/parse.js').parseObjects;
const rulesResource = require('./rule/rule.js').resource;
const splitsResource = require('../split/split.js').resource;


class Invoice extends Resource {
    /**
     *
     * Invoice object
     *
     * @description When you initialize an Invoice, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     * To create scheduled Invoices, which will display the discount, interest, etc. on the final users banking interface,
     * use dates instead of datetimes on the "due" and "discounts" fields.
     *
     * Parameters (required):
     * @param amount [integer]: Invoice value in cents. Minimum = 0 (R$0,00). ex: 1234 (= R$ 12.34)
     * @param taxId [string]: payer tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param name [string]: payer name. ex: 'Iron Bank S.A.'
     *
     * Parameters (optional):
     * @param due [string, default now + 2 days]: Invoice due date in UTC ISO format. ex: '2020-11-25T17:59:26.249976+00:00'
     * @param expiration [integer, default 59 days]: time interval in seconds between due date and expiration date. ex 123456789
     * @param fine [float, default 2.0]: Invoice fine for overdue payment in %. ex: 2.5
     * @param interest [float, default 1.0]: Invoice monthly interest for overdue payment in %. ex: 5.2
     * @param discounts [list of dictionaries, default null]: list of dictionaries with 'percentage':float and 'due':string pairs
     * @param rules [list of Invoice.Rules, default []]: list of Invoice.Rule objects for modifying invoice behavior. ex: [Invoice.Rule({key: "allowedTaxIds", value: [ "012.345.678-90", "45.059.493/0001-73" ]})]
     * @param splits [list of Split.Splits, default []]: list of Split.Splits objects to indicate payment receivers. ex: [Invoice.Split({"amount": 141, "receiverId": "5706627130851328"})]
     * @param tags [list of strings, default null]: list of strings for tagging
     * @param descriptions [list of dictionaries, default null]: list of dictionaries with 'key':string and (optional) 'value':string pairs
     * @param displayDescription [string, default null]: optional description to be shown in the receiver bank interface. ex: 'Payment for service #1234'
     *
     * Attributes (return-only):
     * @param pdf [string]: public Invoice PDF URL. ex: 'https://invoice.starkbank.com/pdf/d454fa4e524441c1b0c1a729457ed9d8'
     * @param link [string]: public Invoice webpage URL. ex: 'https://my-workspace.sandbox.starkbank.com/invoicelink/d454fa4e524441c1b0c1a729457ed9d8'
     * @param nominalAmount [integer]: Invoice emission value in cents (will change if invoice is updated, but not if it's paid). ex: 400000
     * @param fineAmount [integer]: Invoice fine value calculated over nominalAmount. ex: 20000
     * @param interestAmount [integer]: Invoice interest value calculated over nominalAmount. ex: 10000
     * @param discountAmount [integer]: Invoice discount value calculated over nominalAmount. ex: 3000
     * @param id [string]: unique id returned when Invoice is created. ex: '5656565656565656'
     * @param brcode [string]: BR Code for the Invoice payment. ex: '00020101021226800014br.gov.bcb.pix2558invoice.starkbank.com/f5333103-3279-4db2-8389-5efe335ba93d5204000053039865802BR5913Arya Stark6009Sao Paulo6220051656565656565656566304A9A0'
     * @param status [string]: current Invoice status. ex: 'created', 'paid', 'canceled' or 'overdue'
     * @param fee [integer]: fee charged by this Invoice. ex: 65 (= R$ 0.65)
     * @param transactionIds [list of strings]: ledger transaction ids linked to this Invoice (if there are more than one, all but the first are reversals or failed reversal chargebacks). ex ['19827356981273']
     * @param created [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     * @param updated [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     *
     */
    constructor({
                    amount, taxId, name, due= null, expiration = null, fine = null, interest = null, discounts = null, rules = null, splits = null, tags = null, 
                    descriptions = null, displayDescription = null, fee = null, pdf = null, link = null, nominalAmount = null, fineAmount = null, interestAmount = null, 
                    discountAmount = null, id = null, brcode = null, status = null, transactionIds = null, created = null, updated = null
                }) {
        super(id);
        this.amount = amount;
        this.due = check.dateTimeOrDate(due);
        this.taxId = taxId;
        this.name = name;
        this.expiration = expiration;
        this.fine = fine;
        this.interest = interest;
        this.discounts = discounts;
        this.rules = parseObjects(rules, rulesResource, Rule);
        this.splits = parseObjects(splits, splitsResource, Split);
        this.tags = tags;
        if (discounts != null) {
            discounts.forEach(discount => {
                discount.due = check.dateTimeOrDate(discount.due);
            });
        }
        this.descriptions = descriptions;
        this.displayDescription = displayDescription;
        this.fee = fee;
        this.pdf = pdf;
        this.link = link;
        this.nominalAmount = nominalAmount;
        this.fineAmount = fineAmount;
        this.interestAmount = interestAmount;
        this.discountAmount = discountAmount;
        this.brcode = brcode;
        this.status = status;
        this.transactionIds = transactionIds;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.Invoice = Invoice;
let resource = {'class': exports.Invoice, 'name': 'Invoice'};

exports.create = async function (Invoices, {user} = {}) {
    /**
     *
     * Create Invoices
     *
     * @description Send a list of Invoice objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param Invoices [list of Invoice objects]: list of Invoice objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Invoice objects with updated attributes
     *
     */
    return rest.post(resource, Invoices, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Invoice
     *
     * @description Receive a single Invoice object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, status, tags, ids, user} = {}) {
    /**
     *
     * Retrieve Invoices
     *
     * @description Receive a generator of Invoice objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit     [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after     [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before    [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status    [string, default null]: filter for status of retrieved objects. ex: 'created', 'paid', 'canceled' or 'overdue'
     * @param tags      [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids       [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user      [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of Invoice objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, status, tags, ids, user} = {}) {
    /**
     *
     * Retrieve paged Invoices
     *
     * @description Receive a list of up to 100 Invoice objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit     [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after     [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before    [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status    [string, default null]: filter for status of retrieved objects. ex: 'created', 'paid', 'canceled' or 'overdue'
     * @param tags      [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids       [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user      [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of Invoice objects with updated attributes and cursor to retrieve the next page of Invoice objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        tags: tags,
        ids: ids,
    };
    return rest.getPage(resource, query, user);
};

exports.update = function (id, {amount, status, due, expiration, user} = {}) {
    /**
     *
     * Update Invoice entity
     *
     * @description Update Invoice by passing id.
     *
     * Parameters (required):
     * @param id [string]: Invoice id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param status        [string]: If the Invoice hasn't been paid yet, you may cancel it by passing 'canceled' in the status
     * @param amount        [integer]: If the Invoice hasn't been paid yet, you may update its amount by passing the desired amount integer. ex: 100 (R$1,00)
     * @param due           [string, default now + 2 days]: Invoice due date in UTC ISO format. ex: '2020-11-25T17:59:26.249976+00:00'
     * @param expiration    [integer, default null]: time interval in seconds between due date and expiration date. ex 123456789
     * @param user          [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns target Invoice with updated attributes
     *
     */
    let payload = {
        amount: amount,
        status: status,
        due: due,
        expiration: expiration
    };
    return rest.patchId(resource, id, payload, user);
};

exports.qrcode = function (id, {size=7, user} = {}) {
    /**
     *
     * Retrieve a specific Invoice QRCode png
     *
     * @description Receive a single Invoice QRCode in png format generated in the Stark Bank API by the invoice ID.
     *
     * Parameters (required):
     * @param id [string]: Invoice id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param size  [integer, default 7.0]: number of pixels in each 'box' of the QR code. Minimum = 1, maximum = 50. ex: 12
     * @param user  [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice QR Code png blob
     *
     */
    let payload = {
        size: size
    }
    return rest.getContent(resource, id, user, payload, 'qrcode');
};

exports.pdf = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Invoice pdf file
     *
     * @description Receive a single Invoice pdf file generated in the Stark Bank API by passing its id.
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice pdf file
     *
     */
    return rest.getContent(resource, id, user, null, 'pdf');
};

exports.payment = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Invoice payment information
     * 
     * @description Receive the Invoice.Payment sub-resource associated with a paid Invoice.
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice.Payment sub-resource
     *
     */
    return rest.getSubResource(resource, id, subResource, user);
};
