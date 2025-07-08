const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;


class InvoicePullRequest extends Resource {
    /**
     *
     * InvoicePullRequest object
     *
     * @description When you initialize an InvoicePullRequest, the entity will not be automatically
     * sent to the Stark Bank API. The 'create' function sends the objects
     * to the Stark Bank API and returns the list of created objects.
     *
     * Parameters (required):
     * @param subscriptionId [string]: unique id of the InvoicePullSubscription related to the request. ex: "5656565656565656"
     * @param invoiceId [string]: id of the invoice previously created to be sent for payment. ex: "5656565656565656"
     * @param due [string]: payment scheduled date in UTC ISO format. ex: "2023-10-28T17:59:26.249976+00:00"
     *
     * Parameters (optional):
     * @param attemptType [string, default "default"]: attempt type for the payment. Options: "default", "retry". ex: "retry"
     * @param tags [list of strings, default []]: list of strings for tagging
     * @param externalId [string, default None]: a string that must be unique among all your InvoicePullRequests. Duplicated externalIds will cause failures. ex: "my-external-id"
     * @param displayDescription [string, default None]: Description to be shown to the payer. ex: "Payment for services"
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when InvoicePullRequest is created. ex: "5656565656565656"
     * @param status [string]: current InvoicePullRequest status. ex: "pending", "scheduled", "success", "failed", "canceled"
     * @param installmentId [string]: unique id of the installment related to this request. ex: "5656565656565656"
     * @param created [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     * @param updated [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
     *
     */
    constructor({
                    subscriptionId, invoiceId, due, attemptType = 'default', tags = null, externalId = null, displayDescription = null,
                    id = null, status = null, installmentId = null,
                    created = null, updated = null
                }) {
        super(id);
        this.subscriptionId = subscriptionId;
        this.invoiceId = invoiceId;
        this.due = check.datetime(due);
        this.attemptType = attemptType;
        this.tags = tags;
        this.externalId = externalId;
        this.displayDescription = displayDescription;
        this.status = status;
        this.installmentId = installmentId;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.InvoicePullRequest = InvoicePullRequest;
let resource = {'class': exports.InvoicePullRequest, 'name': 'InvoicePullRequest'};

exports.create = async function (requests, {user} = {}) {
    /**
     *
     * Create InvoicePullRequests
     *
     * @description Send a list of InvoicePullRequest objects for creation in the Stark Bank API
     *
     * Parameters (required):
     * @param requests [list of InvoicePullRequest objects]: list of InvoicePullRequest objects to be created in the API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of InvoicePullRequest objects with updated attributes
     *
     */
    return rest.post(resource, requests, user);
};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific InvoicePullRequest
     *
     * @description Receive a single InvoicePullRequest object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns InvoicePullRequest object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, tags, ids, invoiceIds, subscriptionIds, externalIds, status, user } = {}) {
    /**
     *
     * Retrieve InvoicePullRequests
     *
     * @description Receive a generator of InvoicePullRequest objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
     * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param invoiceIds [list of strings, default null]: list of strings to get specific entities by invoice ids. ex: ["12376517623", "1928367198236"]
     * @param subscriptionIds [list of strings, default null]: list of strings to get specific entities by subscription ids. ex: ["12376517623", "1928367198236"]
     * @param externalIds [list of strings, default null]: list of strings to get specific entities by external ids. ex: ["my-external-id-1", "my-external-id-2"]
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of InvoicePullRequest objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        tags: tags,
        ids: ids,
        invoiceIds: invoiceIds,
        subscriptionIds: subscriptionIds,
        externalIds: externalIds,
        status: status
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, tags, ids, invoiceIds, subscriptionIds, externalIds, status, user } = {}) {
    /**
     *
     * Retrieve paged InvoicePullRequests
     *
     * @description Receive a list of up to 100 InvoicePullRequest objects previously created in the Stark Bank API and the cursor to the next page.
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
     * @param subscriptionIds [list of strings, default null]: list of strings to get specific entities by subscription ids. ex: ["12376517623", "1928367198236"]
     * @param externalIds [list of strings, default null]: list of strings to get specific entities by external ids. ex: ["my-external-id-1", "my-external-id-2"]
     * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns list of InvoicePullRequest objects with updated attributes and cursor to retrieve the next page of InvoicePullRequest objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        tags: tags,
        ids: ids,
        invoiceIds: invoiceIds,
        subscriptionIds: subscriptionIds,
        externalIds: externalIds,
        status: status
    };
    return rest.getPage(resource, query, user);
};

exports.cancel = async function (id, { user } = {}) {
    /**
     *
     * Cancel a InvoicePullRequest entity
     *
     * @description Cancel a InvoicePullRequest entity previously created in the Stark Bank API
     *
     * Parameters (required):
     * @param id [string]: InvoicePullRequest unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns canceled InvoicePullRequest object
     *
     */
    return rest.deleteId(resource, id, user);
};
