const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;

class MerchantCard extends Resource {
    /**
     *
     * MerchantCard object
     *
     * @description Stores information about cards used in approved purchases; these cards can be reused for new purchases without creating a new MerchantSession.
     *
     * Attributes (return-only):
     * @param ending [string]: last 4 digits of the card number.
     * @param expiration [string]: card expiration date. ex: '2025-06'
     * @param holderName [string]: name of the card holder.
     * @param fundingType [string]: funding type. Options: 'credit', 'debit'
     * @param network [string]: card network.
     * @param status [string]: current card status. Options: 'active', 'expired', 'canceled', 'blocked'
     * @param tags [list of strings]: tags associated with the card.
     * @param created [string]: creation datetime.
     * @param updated [string]: latest update datetime.
     *
     */

    constructor({
        ending, expiration, holderName, fundingType, network, status, tags, created, updated
    }) {
        super();
        this.ending = ending;
        this.expiration = expiration;
        this.holderName = holderName;
        this.fundingType = fundingType;
        this.network = network;
        this.status = status;
        this.tags = tags;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.MerchantCard = MerchantCard;
let resource = {'class': exports.MerchantCard, 'name': 'MerchantCard'};

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific MerchantCard
     *
     * @description Receive a single MerchantCard object previously created in the Stark Bank API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id.
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns MerchantCard object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
}

exports.query = async function ({limit, after, before, status, tags, ids, user} = {}) {
    /**
     *
     * Retrieve MerchantCards
     *
     * @description Receive a generator of MerchantCard objects previously created in the Stark Bank API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null.
     * @param after [string, default null]: date filter for objects created only after specified date.
     * @param before [string, default null]: date filter for objects created only before specified date.
     * @param status [string, default null]: filter for status of retrieved objects. Options: 'active', 'expired', 'canceled', 'blocked'
     * @param tags [list of strings, default null]: tags to filter retrieved objects.
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects.
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns generator of MerchantCard objects with updated attributes
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
}

exports.page = async function ({ cursor, limit, after, before, status, tags, ids, user} = {}) {
    /**
     *
     * Retrieve paged MerchantCards
     *
     * @description Receive a list of up to 100 MerchantCard objects previously created in the Stark Bank API and the cursor to the next page. Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit, after, before, status, tags, ids, user: same as query()
     *
     * Return:
     * @returns list of MerchantCard objects with updated attributes and cursor to retrieve the next page
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
}
