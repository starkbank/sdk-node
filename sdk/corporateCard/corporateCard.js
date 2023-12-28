const rest = require('../utils/rest.js');
const api = require('core-node').api;
const check = require('core-node').check;
const Resource = require('core-node').Resource;
const parseObjects = require('../utils/parse.js').parseObjects;
const {CorporateRule} = require('../corporateRule/corporateRule.js');
const testCorporateRule = require('../corporateRule/corporateRule.js').resource;

class CorporateCard extends Resource {
    /**
    *  
    * CorporateCard object
    * 
    * @description The CorporateCard object displays the information of the cards created in your Workspace.
    * Sensitive information will only be returned when the "expand" parameter is used, to avoid security concerns.
    * When you initialize a CorporateCard, the entity will not be automatically
    * created in the Stark Bank API. The 'create' function sends the objects
    * to the Stark Bank API and returns the created object.
    * 
    * Parameters (required):
    * @param holderId [string]: card holder unique id. ex: "5656565656565656"
    * 
    * Attributes (return-only):
    * @param id [string]: unique id returned when CorporateCard is created. ex: "5656565656565656"
    * @param holderName [string]: card holder name. ex: "Tony Stark"
    * @param displayName [string]: card displayed name. ex: "ANTHONY STARK"
    * @param rules [list of CorporateRule objects]: [EXPANDABLE] list of card spending rules.
    * @param tags [list of strings]: list of strings for tagging. ex: ["travel", "food"]
    * @param streetLine1 [string, default sub-issuer street line 1]: card holder main address. ex: "Av. Paulista, 200"
    * @param streetLine2 [string, default sub-issuer street line 2]: card holder address complement. ex: "Apto. 123"
    * @param district [string, default sub-issuer district]: card holder address district/neighbourhood. ex: "Bela Vista"
    * @param city [string, default sub-issuer city]: card holder address city. ex: "Rio de Janeiro"
    * @param stateCode [string, default sub-issuer state code]: card holder address state. ex: "GO"
    * @param zipCode [string, default sub-issuer zip code]: card holder address zip code. ex: "01311-200"
    * @param type [string]: card type. ex: "virtual"
    * @param status [string]: current CorporateCard status. ex: "active", "blocked", "canceled", "expired"
    * @param number [string]: [EXPANDABLE] masked card number. Expand to unmask the value. ex: "123"
    * @param securityCode [string]: [EXPANDABLE] masked card verification value (cvv). Expand to unmask the value. ex: "123"
    * @param expiration [string]: masked card expiration datetime. Expand to unmask the value. ex: '2020-03-10 10:30:00.000'
    * @param updated [string]: latest update datetime for the CorporateCard. ex: '2020-03-10 10:30:00.000'
    * @param created [string]: creation datetime for the CorportaCard. ex: '2020-03-10 10:30:00.000'
    */

    constructor ({
                    holderId, id = null, holderName = null, displayName = null, rules = null, tags = null, streetLine1 = null,
                    streetLine2 = null, district = null, city = null, stateCode = null, zipeCode = null, type = null, status = null,
                    number = null, securityCode = null, expiration = null, updated = null, created = null
                }) {
        super(id);
        this.holderId = holderId;
        this.holderName = holderName;
        this.displayName = displayName;
        this.rules = parseObjects(rules, testCorporateRule, CorporateRule);
        this.tags = tags;
        this.streetLine1 = streetLine1;
        this.streetLine2 = streetLine2;
        this.district = district;
        this.city = city;
        this.stateCode = stateCode;
        this.zipeCode = zipeCode;
        this.type = type;
        this.status = status;
        this.number = number;
        this.securityCode = securityCode;
        this.expiration = check.datetime(expiration);
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.CorporateCard = CorporateCard;
let resource = {'class': exports.CorporateCard, 'name': 'CorporateCard'};

exports.create = async function (card, {expand, user} = {}) {
    /**
    * 
    * Create CorporateCard
    * 
    * @description Send a CorporateCard object for creation at the Stark Bank API
    * If the CorporateCard was not used in the last purchase, this resource will return it.
    * 
    * Parameters (required):
    * @param card [CorporateCard object]: CorporateCard object to be created in the API.
    * 
    * Parameters (optional):
    * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    *
    *  Return:
    * @return CorporateCard object with updated attributes
    * 
    */

    let path = `${api.endpoint(resource['name'])}/token`;
    let payload = Object.assign(new resource['class']({}), card);
    api.removeNullKeys(payload);
    let json = await rest.postRaw(path, payload, user, {"expand": expand});
    let name = api.lastName(resource['name']);
    let returnEntity = json[name];

    return Object.assign(new resource['class'](returnEntity), returnEntity);
}


exports.query = async function ({limit, after, before, status, types, holderIds, ids, tags, expand, user} = {}) {
    /**
    * 
    * Retrieve CorporateCards
    * 
    * @description Receive a generator of CorporateCard objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled", "expired"]
    * @param types [list of strings, default null]: card type. ex: ["virtual"]
    * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return generator of CorporateCard objects with updated attributes
    * 
    */

    let query = {
        limit: limit,
        after: after,
        before: before,
        status: status,
        types: types,
        holderIds: holderIds,
        ids: ids,
        tags: tags,
        expand: expand,
    }

    return rest.getList(resource, query, user);
}

exports.page = async function ({cursor, limit, after, before, status, types, holderIds, ids, tags, expand, user} = {}) {
    /**
    * 
    * Retrieve paged CorporateCards
    * 
    * @description Receive a list of up to 100 CorporateCard objects previously created in the Stark Bank API and the cursor to the next page.
    * Use this function instead of query if you want to manually page your requests.
    * Parameters (optional):
    * 
    * @param cursor [string, default null]: cursor returned on the previous page function call
    * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled", "expired"]
    * @param types [list of strings, default null]: card type. ex: ["virtual"]
    * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    *
    * Return:
    * @return list of CorporateCard objects with updated attributes
    * @return cursor to retrieve the next page of CorporateCard objects
    * 
    */

    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        status: status,
        types: types,
        holderIds: holderIds,
        ids: ids,
        tags: tags,
        expand: expand,
    }

    return rest.getPage(resource, query, user);
}

exports.get = async function (id, {expand, user} = {}) {
    /**
    * 
    * Retrieve a specific CorporateCard
    * 
    * @description Receive a single CorporateCard object previously created in the Stark Bank API by its id
    * 
    * Parameters (required):
    * @param id [string]: object unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return CorporateCard object with updated attributes
    * 
    */

    return rest.getId(resource, id, expand, user);
}

exports.update = async function (id, {status, displayName, rules, tags, pin, user} = {}) {
    /**
    * 
    * Update a CorporateCard entity
    * 
    * @description Update a CorporateCard by passing id.
    * 
    * Parameters (required):
    * @param id [string]: CorporateCard id. ex: '5656565656565656'
    * 
    * Parameters (optional):
    * @param status [string, default null]: You may block the CorporateCard by passing 'blocked' or activate by passing 'active' in the status
    * @param displayName [string, default null]: card displayed name. ex: "ANTHONY EDWARD"
    * @param pin [string, default null]: You may unlock your physical card by passing its PIN. This is also the PIN you use to authorize a purhcase.
    * @param rules [list of CorporateRule objects, default null]: list of dictionaries with "amount": int, "currencyCode": string, "id": string, "interval": string, "name": string pairs.
    * @param tags [list of strings]: list of strings for tagging. ex: ["tony", "stark"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    *
    * Return:
    * @return target CorporateCard with updated attributes
    * 
    */

    let payload = {
        "status": status,
        "displayName": displayName,
        "pin": pin,
        "rules": rules,
        "tags": tags,
    }
    return rest.patchId(resource, id, payload, user);
}

exports.cancel = async function (id, {user} = {}) {
    /**
    * 
    * Cancel a CorporateCard entity
    * 
    * @descrption Cancel a CorporateCard entity previously created in the Stark Bank API
    * 
    * Parameters (required):
    * @param id [string]: CorporateCard unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * Return:
    * @return canceled CorporateCard object
    * 
    */

    return rest.deleteId(resouce, id, user);

}
