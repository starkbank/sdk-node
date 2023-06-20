const Resource = require('../utils/resource.js').Resource;
const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const parseObjects = require('../utils/parse.js').parseObjects;
const {CorporateRule} = require('../corporateRule/corporateRule.js');
const rulesResource = require('../corporateRule/corporateRule.js').resource;
const {Permission} = require('./permission.js');
const permissionResource = require('./permission.js').resource;

class CorporateHolder extends Resource {
    /**
    * 
    * CorporateHolder object
    * 
    * @description The CorporateHolder describes a card holder that may group several cards.
    * When you initialize a CorporateHolder, the entity will not be automatically
    * created in the Stark Bank API. The 'create' function sends the objects
    * to the Stark Bank API and returns the created object.
    * 
    * Parameters (required):
    * @param name [string]: cardholder name. ex: "Tony Stark"
    * 
    * Parameters (optional):
    * @param centerId [string, default null]: target cost center ID. ex: "5656565656565656"
    * @param permissions [list of Permission object, default null]: list of Permission object representing access granted to an user for a particular cardholder.
    * @param rules [list of CorporateRule, default []]: [EXPANDABLE] list of holder spending rules
    * @param tags [list of strings, default []]: list of strings for tagging. ex: ["travel", "food"]
    *
    * Attributes (return-only):
    * @param id [string]: unique id returned when CorporateHolder is created. ex: "5656565656565656"
    * @param status [string]: current CorporateHolder status. ex: "active", "blocked", "canceled"
    * @param updated [string] latest update datetime for the CorporateHolder. ex: '2020-03-10 10:30:00.000'
    * @param created [string] creation datetime for the CorporateHolder. ex: '2020-03-10 10:30:00.000'
    */

    constructor({
                    name, centerId = null, permissions = null, rules = null, tags = null, id = null, status = null, 
                    updated = null, created = null
                }) {
        super(id);
        this.name = name;
        this.centerId = centerId;
        this.permissions = parseObjects(permissions, permissionResource, Permission);
        this.rules = parseObjects(rules, rulesResource, CorporateRule);
        this.tags = tags;
        this.status = status;
        this.updated = check.datetime(updated);
        this.created = check.datetime(created);
    }

}

exports.CorporateHolder = CorporateHolder;
let resource = {'class': exports.CorporateHolder, 'name': 'CorporateHolder'};

exports.create = async function (holder, {expand, user} = {}) {
    /**
    * 
    * @description Send a list of CorporateHolder objects for creation at the Stark Bank API
    * 
    * Parameters (required):
    * @param holders [list of CorporateHolder objects]: list of CorporateHolder objects to be created in the API
    * 
    * Parameters (optional):
    * @param expand [list of strings, default null]: fields to expand information. Options: ["rules"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return list of CorporateHolder objects with updated attributes
    * 
    */

    query = {
        expand: expand
    }
    return await rest.post(resource, holder, user, query);
}

exports.get = async function (id, {expand, user} = {}) {
    /**
    * 
    * Retrieve a specific CorporateHolder
    * 
    * @description Receive a single CorporateHolder object previously created in the Stark Bank API by its id
    * 
    * Parameters (required):
    * @param id [string]: object unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param expand [list of strings, default null]: fields to expand information. Options: ["rules"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @retun CorporateHolder object with updated attributes
    * 
    */

    query = {
        expand: expand
    }
    return await rest.getId(resource, id, user, query);
}

exports.query = async function ({limit, after, before, ids, status, tags, expand, user} = {}) {
    /**
    * 
    * Retrieve CorporateHolders
    * 
    * @description Receive a generator of CorporateHolder objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
    * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled"]
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param expand [string, default null]: fields to expand information. Options: ["rules"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @retun generator of CorporateHolder objects with updated attributes
    * 
    */

    let query = {
        limit: limit,
        after: after,
        before: before,
        tags: tags,
        ids: ids,
        status: status,
        expand: expand,
    };

    return rest.getList(resource, query, user);
}


exports.page = async function ({cursor, limit, after, before, ids, status, tags, expand, user} = {}) {
    /**
    * 
    * Retrieve CorporateHolders
    * 
    * @description Receive a list of up to 100 CorporateHolder objects previously created in the Stark Bank API and the cursor to the next page.
    * Use this function instead of query if you want to manually page your requests.
    * 
    * Parameters (optional):
    * @param cursor [string, default null]: cursor returned on the previous page function call
    * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
    * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled"]
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param expand [string, default null]: fields to expand information. Options: ["rules"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return list of CorporateHolder objects with updated attributes
    * @return cursor to retrieve the next page of CorporateHolder objects
    * 
    */

    let query = {
        cursor: cursor, 
        limit: limit,
        after: after,
        before: before,
        status: status,
        tags: tags,
        ids: ids,
        expand: expand,
    };

    return rest.getPage(resource, query, user);

}

exports.update = async function (id, {centerId, permissions, status, name, rules, tags, user} = {}) {
    /**
    * 
    * Update CorporateHolder entity
    * 
    * @description Update a CorporateHolder by passing its id.
    *
    * Parameters (required):
    * @parmam id [string]: CorporateHolder id. ex: '5656565656565656'
    * 
    * Parameters (optional):
    * @param centerId [string, default null]: target cost center ID. ex: "5656565656565656"
    * @param permissions [list of Permission object, default null]: list of Permission object representing access granted to an user for a particular cardholder.
    * @param status [string, default null]: You may block the CorporateHolder by passing 'blocked' in the status
    * @param name [string, default null]: card holder name.
    * @param tags [list of strings, default null]: list of strings for tagging
    * @param rules [list of dictionaries, default null]: list of dictionaries with "amount": int, "currencyCode": string, "id": string, "interval": string, "name": string pairs
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return target CorporateHolder with updated attributes
    * 
    */
    
    let payload = {
        centerId: centerId,
        permissions: parseObjects(permissions, permissionResource, Permission),
        status: status,
        name: name,
        rules: rules,
        tags: tags,
        user: user
    };

    return rest.patchId(resource, id, payload, user);
}

exports.cancel = async function (id, {user} = {}) {
    /**
    * 
    * Cancel a CorporateHolder entity
    * 
    * @description Cancel a CorporateHolder entity previously created in the Stark Bank API
    * 
    * Parameters (required):
    * @param id [string]: CorporateHolder unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
    * 
    * Return:
    * @return canceled CorporateHolder object
    * 
    */

    return rest.deleteId(resource, id, user);
}
