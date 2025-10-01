const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const Resource = require('starkcore').Resource;

class SplitProfile extends Resource {
    /**
     * 
     * SplitProfile object
     * 
     * @description When you create a Split, the entity SplitProfile will be automatically created, if you haven't create a Split yet, you can use the put method to create your SplitProfile.
     * 
     * Parameters (optional):
     * @param interval [string]: frequency of transfer, default 'week'. Options: 'day', 'week', 'month'
     * @param delay [integer]: how long the amount will stay at the workspace in milliseconds, ex: 604800
     * @param tags [list of strings, default []]: list of strings for tagging
     * 
     * Attributes (return-only):
     * @param id [string]: unique id returned when SplitProfile is created. ex: '5656565656565656'
     * @param status [string]: current SplitProfile status. ex: 'created'
     * @param created [string]: creation datetime for the SplitProfile. ex: '2020-03-10 10:30:00.000000+00:00'
     * @param updated [string]: update datetime for the SplitProfile. ex: '2020-03-10 10:30:00.000000+00:00'
     * 
     */

    constructor({ interval = null, delay = null, tags = null, id = null, status = null, created = null, updated = null }) {
        super(id);
        this.interval = interval;
        this.delay = delay;
        this.tags = tags;
        this.status = status;
        this.created = check.datetime(created);
        this.updated = check.datetime(updated);
    }
}

exports.SplitProfile = SplitProfile;
let resource = {'class': exports.SplitProfile, 'name': 'SplitProfile'};

exports.put = async function (splitProfiles, {user} = {}) {
    /**
     *
     * Create SplitProfile or update it if you already have it created
     * 
     * @description Send a list of SplitProfile objects for creation in the Stark Bank API
     * 
     * Parameters (required):
     * @param profile [list of SplitProfile objects]: SplitProfile object to be created in the API
     * 
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns SplitProfile object with updated attributes
     * 
     */
    return rest.putMulti(resource, splitProfiles, user);
}

exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific SplitProfile
     * 
     * @description Receive a single SplitProfile object previously created in the Stark Bank API by its id
     * 
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns SplitProfile object with updated attributes
     * 
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, tags, ids, user} = {}) {
    /**
     *
     * Retrieve SplitProfiles
     * 
     * @description Receive a generator of SplitProfile objects previously created in the Stark Bank API
     * 
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ['created']
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns generator of SplitProfile objects with updated attributes
     * 
     */
    let query = {
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        tags: tags,
        ids: ids,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({cursor, limit, after, before, tags, ids, user} = {}) {
    /**
     *
     * Retrieve SplitProfiles
     * 
     * @description Receive a list of up to 100 SplitProfile objects previously created in the Stark Bank API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     * 
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ['created']
     * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns list of SplitProfile objects with updated attributes and cursor to retrieve the next page of SplitProfile objects
     * 
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: check.date(after),
        before: check.date(before),
        tags: tags,
        ids: ids,
    };
    return rest.getPage(resource, query, user);
}
