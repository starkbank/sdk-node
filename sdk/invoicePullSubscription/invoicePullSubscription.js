const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;


class InvoicePullSubscription extends Resource {
    /**
     *
     * InvoicePullSubscription object
     *
     * @description When you initialize an InvoicePullSubscription, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param start [string]: subscription start date. ex: "2022-04-01"
     * @param interval [string]: subscription installment interval. Options: "week", "month", "quarter", "semester", "year"
     * @param pullMode [string]: subscription pull mode. Options: "manual", "automatic". Automatic mode will create the Invoice Pull Requests automatically
     * @param pullRetryLimit [integer]: subscription pull retry limit. Options: 0,
     * @param type [string]: subscription type. Options: "push", "qrcode", "qrcodeAndPayment", "paymentAndOrQrcode"
     *
     * Parameters (conditionally required):
     * @param amount [integer, default 0]: subscription amount in cents. Required if an amountMinLimit is not informed. Minimum = 1 (R$ 0.01). ex: 100 (= R$ 1.00)
     * @param amountMinLimit [integer, 0 None]: subscription minimum amount in cents. Required if an amount is not informed. Minimum = 1 (R$ 0.01). ex: 100 (= R$ 1.00)
     *
     * Parameters (optional):
     * @param displayDescription [string, default None]: Invoice description to be shown to the payer. ex: "Subscription payment"
     * @param due [integer, default None]: subscription invoice due offset. Available only for type "push". ex: timedelta(days=7)
     * @param externalId [string, default None]: string that must be unique among all your subscriptions. Duplicated externalIds will cause failures. ex: "my-external-id"
     * @param referenceCode [string, default None]: reference code for reconciliation. ex: "REF123456"
     * @param end [string, default None]: subscription end date. ex: "2023-04-01"
     * @param data [dictionary, default None]: additional data for the subscription based on type
     * @param name [string, default None]: subscription debtor name. ex: "Iron Bank S.A."
     * @param taxId [string, default None]: subscription debtor tax ID (CPF or CNPJ) with or without formatting. ex: "01234567890" or "20.018.183/0001-80"
     * @param tags [list of strings, default []]: list of strings for tagging
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when InvoicePullSubscription is created. ex: "5656565656565656"
     * @param status [string]: current InvoicePullSubscription status. ex: "active", "canceled", "created", "expired"
     * @param bacenId [string]: unique authentication id at the Central Bank. ex: "RR2001818320250616dtsPkBVaBYs"
     * @param brcode [string]: Brcode string for the InvoicePullSubscription. ex: "00020101021126580014br.gov.bcb.pix0114+5599999999990210starkbank.com.br520400005303986540410000000000005802BR5913Stark Bank S.A.6009SAO PAULO62070503***6304D2B1"
     * @param installmentId [string]: unique id of the installment related to this request. ex: "5656565656565656"
     * @param created [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     * @param updated [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     *
     */
    constructor({
                    start, interval, pullMode, pullRetryLimit, type, amount = null, amountMinLimit = null, displayDescription = null,
                    due = null, externalId = null, referenceCode = null, end = null, data = null, name = null, taxId = null, tags = null,
                    id = null, status = null, bacenId = null, installmentId = null, created = null, updated = null
                }) {
        super(id);
        this.start = check.datetime(start);
        this.interval = interval;
        this.pullMode = pullMode;
        this.pullRetryLimit = pullRetryLimit;
        this.type = type;
        this.amount = amount;
        this.amountMinLimit = amountMinLimit;
        this.displayDescription = displayDescription;
        this.due = due;
        this.externalId = externalId;
        this.referenceCode = referenceCode;
        this.end = check.datetime(end);
        this.data = data;
        this.name = name;
        this.taxId = taxId;
        this.tags = tags;
        this.status = status;
        this.bacenId = bacenId;
        this.installmentId = installmentId;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.InvoicePullSubscription = InvoicePullSubscription;
let resource = {'class': exports.InvoicePullSubscription, 'name': 'InvoicePullSubscription'};

exports.create = async function (subscriptions, {user} = {}) {
    /**
     *
     * Create InvoicePullSubscriptions
     *
     * @description Send a list of InvoicePullSubscription objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param subscriptions [list of InvoicePullSubscription objects]: list of InvoicePullSubscription objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of InvoicePullSubscription objects with updated attributes
     *
     */
    return rest.post(resource, subscriptions, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific InvoicePullSubscription
     *
     * @description Receive a single InvoicePullSubscription object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns InvoicePullSubscription object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, tags, ids, invoiceIds, subscriptionIds, externalIds, status, user } = {}) {
    /**
     *
     * Retrieve InvoicePullSubscriptions
     *
     * @description Receive a generator of InvoicePullSubscription objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param invoiceIds [list of strings, default null]: list of strings to get specific entities by invoice ids. ex: ["12376517623", "1928367198236"]
     * @param externalIds [list of strings, default null]: list of strings to get specific entities by external ids. ex: ["my-external-id-1", "my-external-id-2"]
     * @param status [string, default null]: filter for status of retrieved objects. ex: "active", "canceled", "created", "expired"
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of InvoicePullSubscription objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        invoiceIds: invoiceIds,
        externalIds: externalIds,
        tags: tags,
        ids: ids
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, tags, ids, invoiceIds, subscriptionIds, externalIds, status, user } = {}) {
    /**
     *
     * Retrieve paged InvoicePullSubscriptions
     *
     * @description Receive a list of up to 100 InvoicePullSubscription objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call.
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param invoiceIds [list of strings, default null]: list of strings to get specific entities by invoice ids. ex: ["12376517623", "1928367198236"]
     * @param externalIds [list of strings, default null]: list of strings to get specific entities by external ids. ex: ["my-external-id-1", "my-external-id-2"]
     * @param status [string, default null]: filter for status of retrieved objects. ex: ex: "active", "canceled", "created", "expired"
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of InvoicePullSubscription objects with updated attributes and cursor to retrieve the next page of InvoicePullSubscription objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        invoiceIds: invoiceIds,
        externalIds: externalIds,
        tags: tags,
        ids: ids,
        status: status
    };
    return rest.getPage(resource, query, user);
};

exports.cancel = async function (id, { user } = {}) {
    /**
     *
     * Cancel a InvoicePullSubscription entity
     *
     * @description Cancel a InvoicePullSubscription entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: InvoicePullSubscription unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns canceled InvoicePullSubscription object
     *
     */
    return rest.deleteId(resource, id, user);
};
