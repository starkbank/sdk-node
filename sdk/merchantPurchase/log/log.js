const rest = require('../../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('../../utils/resource.js').Resource

class Log extends Resource {
    /**
     * Check out our API Documentation at https://starkbank.com/docs/api#merchant-purchase
     */

    constructor({
        created, type, errors, purchase, id
    }) {
        super(id);
        this.created = check.datetime(created);
        this.type = type;
        this.errors = errors;
        this.purchase = purchase;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'MerchantPurchaseLog'};

exports.get = async function (id, {user} = {}) {
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, types, purchaseIds, user} = {}) {
    let query = {
        limit: limit,
        after: after,
        before: before,
        purchaseIds: purchaseIds,
        types: types,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({cursor, limit, after, before, types, purchaseIds, user} = {}) {
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        purchaseIds: purchaseIds,
    };
    return rest.getPage(resource, query, user);
};
