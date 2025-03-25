const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;

class MerchantCard extends Resource {
    /**
     * Check out our API Documentation at https://starkbank.com/docs/api#merchant-card
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
    return rest.getId(resource, id, user);
}

exports.query = async function ({limit, after, before, status, tags, ids, user} = {}) {
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
