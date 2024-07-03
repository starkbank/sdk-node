const rest = require('../utils/rest.js');
const check = require('starkcore').check;
const prefix = require('../../index.js').requestMethodsPrefix

exports.get = async function (path, query, {user} = {}) {
    /**
     *
     * Retrieve any StarkBank resource
     *
     * @description Receive a json of resources previously created in StarkBank's API
     *
     * Parameters (required):
     * @param path [string]: StarkBank resource's route. ex: "/invoice/"
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * @param query [object, default None]: Query parameters. ex: {"limit": 1, "status": "paid"} 
     *
     * Return:
     * @returns a list of StarkBank objects with updated attributes
     *
     */
    return rest.getRaw(path, query, prefix, false, user);
};

exports.post = async function (path, body, {user} = {}) {
    /**
     *
     * Retrieve any StarkBank resource
     *
     * @description Receive a json of resources previously created in StarkBank's API
     *
     * Parameters (required):
     * @param path [string]: StarkBank resource's route. ex: "/invoice/"
     * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns a list of StarkBank objects with updated attributes
     *
     */
    return rest.postRaw(path, body, prefix, false, user);
};

exports.patch = async function (path, body, {user} = {}) {
        /**
     *
     * Retrieve any StarkBank resource
     *
     * @description Receive a json of resources previously created in StarkBank's API
     *
     * Parameters (required):
     * @param path [string]: StarkBank resource's route. ex: "/invoice/"
     * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns a list of StarkBank objects with updated attributes
     *
     */
    return rest.patchRaw(path, body, prefix, false, user);
};

exports.put = async function (path, body, {user} = {}) {
    /**
     *
     * Retrieve any StarkBank resource
     *
     * @description Receive a json of resources previously created in StarkBank's API
     *
     * Parameters (required):
     * @param path [string]: StarkBank resource's route. ex: "/invoice/"
     * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns a list of StarkBank objects with updated attributes
     *
     */
    return rest.putRaw(path, body, prefix, false, user);
};

exports.delete = async function (path, body, {user} = {}) {
    /**
     *
     * Retrieve any StarkBank resource
     *
     * @description Receive a json of resources previously created in StarkBank's API
     *
     * Parameters (required):
     * @param path [string]: StarkBank resource's r\oute. ex: "/invoice/"
     * @param body [object]: request parameters. ex: {"invoices": [{"amount": 100, "name": "Iron Bank S.A.", "taxId": "20.018.183/0001-80"}]}
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
     *
     * Return:
     * @returns a list of StarkBank objects with updated attributes
     *
     */
    return rest.deleteRaw(path, body, prefix, false, user);
};
