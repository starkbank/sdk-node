const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource
const subResource = require('../invoice/payment.js').subResource


class Invoice extends Resource {
    /**
     *
     * Invoice object
     *
     * @description When you initialize an Invoice, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param amount            [integer]: Invoice value in cents. Minimum = 0 (R$0,00). ex: 1234 (= R$ 12.34)
     * @param taxId             [string]: payer tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
     * @param name              [string]: payer name. ex: 'Iron Bank S.A.'
     *
     * Parameters (optional):
     * @param due               [string, default now + 2 days]: Invoice due date in UTC ISO format. ex: '2020-11-25T17:59:26.249976+00:00'
     * @param expiration        [integer, default 59 days]: time interval in seconds between due date and expiration date. ex 123456789
     * @param fine              [float, default 2.0]: Invoice fine for overdue payment in %. ex: 2.5
     * @param interest          [float, default 1.0]: Invoice monthly interest for overdue payment in %. ex: 5.2
     * @param discounts         [list of dictionaries, default null]: list of dictionaries with 'percentage':float and 'due':string pairs
     * @param tags              [list of strings, default null]: list of strings for tagging
     * @param descriptions      [list of dictionaries, default null]: list of dictionaries with 'key':string and (optional) 'value':string pairs
     *
     * Attributes (return-only):
     * @param fee               [integer, default null]: fee charged by this Invoice. ex: 65 (= R$ 0.65)
     * @param pdf               [string, default null]: public Invoice PDF URL. ex: 'https://invoice.starkbank.com/pdf/d454fa4e524441c1b0c1a729457ed9d8'
     * @param nominalAmount     [integer, default null]: Invoice emission value in cents (will change if invoice is updated, but not if it's paid). ex: 400000
     * @param fineAmount        [integer, default null]: Invoice fine value calculated over nominalAmount. ex: 20000
     * @param interestAmount    [integer, default null]: Invoice interest value calculated over nominalAmount. ex: 10000
     * @param discountAmount    [integer, default null]: Invoice discount value calculated over nominalAmount. ex: 3000
     * @param id                [string, default null]: unique id returned when Invoice is created. ex: '5656565656565656'
     * @param brcode            [string, default null]: BR Code for the Invoice payment. ex: '00020101021226800014br.gov.bcb.pix2558invoice.starkbank.com/f5333103-3279-4db2-8389-5efe335ba93d5204000053039865802BR5913Arya Stark6009Sao Paulo6220051656565656565656566304A9A0'
     * @param status            [string, default null]: current Invoice status. ex: 'created', 'paid', 'canceled' or 'overdue'
     * @param created           [string, default null]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     * @param updated           [string, default null]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     *
     */
    constructor({
                    amount, taxId, name, due= null, expiration = null, fine = null, interest = null, discounts = null,
                    tags = null, descriptions = null, fee = null, pdf = null, nominalAmount = null, fineAmount = null, interestAmount = null,
                    discountAmount = null, id = null, brcode = null, status = null, created = null, updated = null
                }) {
        super(id);
        this.amount = amount;
        this.due = check.datetime(due);
        this.taxId = taxId;
        this.name = name;
        this.expiration = expiration;
        this.fine = fine;
        this.interest = interest;
        this.discounts = discounts;
        this.tags = tags;
        discounts.forEach(discount => {
            discount.due = check.datetime(discount.due);
        });
        this.descriptions = descriptions;
        this.fee = fee;
        this.pdf = pdf;
        this.nominalAmount = nominalAmount;
        this.fineAmount = fineAmount;
        this.interestAmount = interestAmount;
        this.discountAmount = discountAmount;
        this.brcode = brcode;
        this.status = status;
        this.created = check.date(created);
        this.updated = check.date(updated);
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
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
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
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
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
     * @param user      [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
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
     * @param user          [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns target Invoice with updated attributes
     *
     */
    let payload = {
        amount:         amount,
        status:         status,
        due:            due,
        expiration:     expiration
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
     * @param user  [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice QR Code png blob
     *
     */
    let payload = {
        size: size
    }
    return rest.getQrcode(resource, id, payload, user);
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
     * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns Invoice pdf file
     *
     */
    return rest.getPdf(resource, id, {}, user);
};

exports.payment = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific Invoice payment information
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
