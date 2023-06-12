const Resource = require('../utils/resource.js').Resource;
const check = require('../utils/check.js');
const rest = require('../utils/rest.js');

class CorporateInvoice extends Resource {
    /**
    * 
    * CorporateInvoice object
    * 
    * @description The CorporateInvoice objects created in your Workspace load your Corporate balance when paid.
    * When you initialize a CorporateInvoice, the entity will not be automatically
    * created in the Stark Bank API. The 'create' function sends the objects
    * to the Stark Bank API and returns the created object.
    * 
    * Parameters (required):
    * 
    * @param amount [integer]: CorporateInvoice value in cents. ex: 1234 (= R$ 12.34)
    * 
    * Parameters (optional):
    * @param tags [list of strings, default []]: list of strings for tagging. ex: ["travel", "food"]
    * 
    * Attributes (return-only):
    * @param id [string]: unique id returned when CorporateInvoice is created. ex: "5656565656565656"
    * @param name [string, default sub-issuer name]: payer name. ex: "Iron Bank S.A."
    * @param taxId [string, default sub-issuer tax ID]: payer tax ID (CPF or CNPJ) with or without formatting. ex: "01234567890" or "20.018.183/0001-80"
    * @param brcode [string]: BR Code for the Invoice payment. ex: "00020101021226930014br.gov.bcb.pix2571brcode-h.development.starkbank.com/v2/d7f6546e194d4c64a153e8f79f1c41ac5204000053039865802BR5925Stark Bank S.A. - Institu6009Sao Paulo62070503***63042109"
    * @param due [string]: Invoice due and expiration date in UTC ISO format. ex: '2020-03-10 10:30:00.000'
    * @param link [string]: public Invoice webpage URL. ex: "https://starkbank-card-issuer.development.starkbank.com/invoicelink/d7f6546e194d4c64a153e8f79f1c41ac"
    * @param status [string]: current CorporateInvoice status. ex: "created", "expired", "overdue", "paid"
    * @param corporateTransactionId [string]: ledger transaction ids linked to this CorporateInvoice. ex: "corporate-invoice/5656565656565656"
    * @param updated [string] latest update datetime for the CorporateInvoice. ex: '2020-03-10 10:30:00.000'
    * @param created [string] creation datetime for the CorporateInvoice. ex: '2020-03-10 10:30:00.000'
    * 
    */

    constructor ({
                    amount, taxId = null, name = null, tags = null, id = null, brcode = null, due = null, link = null,
                    status = null, corporateTransactionId = null, updated = null, created = null
                }) {
        super(id);
        this.amount = amount;
        this.taxId = taxId;
        this.name = name;
        this.tags = tags;
        this.brcode = brcode;
        this.due = check.datetimeOrDate(due);
        this.link = link;
        this.status = status;
        this.corporateTransactionId = corporateTransactionId;
        this.updated = check.datetime(updated);
        this.created = check.datetime(created);
    }
}

exports.CorporateInvoice = CorporateInvoice;
exports.resource = {'class': exports.CorporateInvoice, 'name': 'CorporateInvoice'}

exports.create = async function (invoice, {user} = {}) {
    /**
    * 
    * Create CorporateInvoice
    * 
    * @description Send a CorporateInvoice object for creation at the Stark Bank API
    * 
    * Parameters (required):
    * @param invoice [CorporateInvoice object]: CorporateInvoice object to be created in the API.
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return CorporateInvoice object with updated attributes
    * 
    */

    return rest.postSingle(exports.resource, invoice, user);
}

exports.query = async function ({limit, after, before, status, tags, user} = {}) {
    /**
    * 
    * Retrieve CorporateInvoices
    * 
    * @description Receive a generator of CorporateInvoice objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["created", "expired", "overdue", "paid"]
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return generator of CorporateInvoice objects with updated attributes
    * 
    */

    let query = {
        limit: limit,
        after: after,
        before: before,
        status: status,
        tags: tags,
    }
    return rest.getList(exports.resource, query, user);
}

exports.page = async function ({cursor, limit, after, before, status, tags, user} = {}) {
    /**
    * 
    * Retrieve CorporateInvoices
    * 
    * @description Receive a list of up to 100 CorporateInvoice objects previously created in the Stark Bank API and the cursor to the next page.
    * Use this function instead of query if you want to manually page your requests.
    * 
    * Parameters (optional):
    * @return cursor [string, default null]: cursor returned on the previous page function call
    * @return limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
    * @return after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @return before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @return status [list of strings, default null]: filter for status of retrieved objects. ex: ["created", "expired", "overdue", "paid"]
    * @return tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @return user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return list of CorporateInvoice objects with updated attributes
    * @return cursor to retrieve the next page of CorporateInvoice objects
    * 
    */

    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        status: status,
        tags: tags
    }

    return rest.getPage(exports.resource, query, user);
}
