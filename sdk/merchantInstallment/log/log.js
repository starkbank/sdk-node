const rest = require('../../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('../../utils/resource.js').Resource


class Log extends Resource {
    constructor({
        created, type, errors, installment, id
    }) {
        super(id);
        this.created = check.datetime(created);
        this.type = type;
        this.errors = errors;
        this.installment = installment;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'MerchantInstallmentLog'};

exports.get = async function (id, {user} = {}) {
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, types, cardIds, user} = {}) {
    let query = {
        limit: limit,
        after: after,
        before: before,
        types: types,
        cardIds: cardIds,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({cursor, limit, after, before, types, cardIds, user} = {}) {
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        cardIds: cardIds,
    };
    return rest.getPage(resource, query, user);
};
