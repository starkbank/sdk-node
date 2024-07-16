const rest = require('../../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('../../utils/resource.js').Resource

class Log extends Resource {

    /**
     * Check out our API Documentation at https://starkbank.com/docs/api#merchant-purchase
     */

    constructor({ created, type, errors, merchantPurchase, id }) {
        super(id);
        this.created = check.datetime(created);
        this.type = type;
        this.errors = errors;
        this.merchantPurchase = merchantPurchase;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'MerchantPurchaseLog'};

exports.get = async function (id, {user} = {}) {
    return rest.getId(resource, id, user);
};

exports.query = async function ({ limit, after, before, user} = {}) {
    let query = {
        limit: limit,
        after: after,
        before: before
    };
    return rest.getList(resource, query, user);
};
