const rest = require('../utils/rest');
const Resource = require('../utils/resource').Resource;

class Workspace extends Resource {
    /**
     * 
     * Workspace object
     * 
     * @description Workspaces are bank accounts. They have independent balances, statements, operations and permissions.
     * The only property that is shared between your workspaces is that they are linked to your organization,
     * which carries your basic informations, such as tax ID, name, etc..
     * 
     * Parameters (required):
     * @param username [string]: Simplified name to define the workspace URL. This name must be unique across all Stark Bank Workspaces. Ex: 'starkbankworkspace'
     * @param name [string]: Full name that identifies the Workspace. This name will appear when people access the Workspace on our platform, for example. Ex: 'Stark Bank Workspace'
     * 
     * Attributes:
     * @param id [string, default null]: unique id returned when the workspace is created. ex: '5656565656565656'
     * 
     */
    constructor({username, name, id=null}) {
        super(id);
        this.username = username;
        this.name = name;
    }
}

exports.Workspace = Workspace;
let resource = {'class': exports.Workspace, 'name': 'Workspace'};

exports.create = async function ({ username, name, user = null }) {
    /**
     * 
     * Create Workspace
     * 
     * @description Send a Workspace for creation in the Stark Bank API
     * 
     * Parameters (required):
     * @param username [string]: Simplified name to define the workspace URL. This name must be unique across all Stark Bank Workspaces. Ex: 'starkbankworkspace'
     * @param name [string]: Full name that identifies the Workspace. This name will appear when people access the Workspace on our platform, for example. Ex: 'Stark Bank Workspace'
     * 
     * Parameters (optional):
     * @param user [Organization object]: Organization object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns Workspace object with updated attributes
     * 
     */
    return rest.postSingle(resource, new Workspace({username: username, name: name}), user);       
};

exports.get = async function (id, {user} = {}){
    /**
     * 
     * Retrieve a specific Workspace
     * 
     * Receive a single Workspace object previously created in the Stark Bank API by passing its id
     * 
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns Workspace object with updated attributes
     * 
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, username, ids, user} = {}){
    /**
     * 
     * Retrieve Workspaces
     * 
     * Receive a generator of Workspace objects previously created in the Stark Bank API.
     * If no filters are passed and the user is an Organization, all of the Organization Workspaces
     * will be retrieved.
     * 
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param username [string]: query by the simplified name that defines the workspace URL. This name is always unique across all Stark Bank Workspaces. Ex: 'starkbankworkspace'
     * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns generator of Workspace objects with updated attributes
     * 
     */
    let query = {
        limit: limit,
        username: username,
        ids: ids
    };
    return rest.getList(resource, query, user);
};

exports.update = async function (id, {username, name, allowedTaxIds, user} = {}){
    /**
     * 
     * Update a Workspace entity
     * 
     * @description Update a Workspace by passing its ID.
     * 
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     * 
     * Parameters (optional):
     * @param name [string, default null]: Full name that identifies the Workspace. This name will appear when people access the Workspace on our platform, for example. Ex: "Stark Bank Workspace"
     * @param username [string]: Simplified name to define the workspace URL. This name must be unique across all Stark Bank Workspaces. Ex: "starkbank-workspace"
     * @param allowedTaxIds [list of strings, default null]: list of tax IDs that will be allowed to send Deposits to this Workspace. If empty, all are allowed. ex: ["012.345.678-90", "20.018.183/0001-80"]
     * @param user [Organization/Project object]: Organization or Project object.Not necessary if starkbank.user was set before function call
     * 
     * Return:
     * @returns target Workspace with updated attributes
     * 
     */
    let payload = {
        name: name,
        username: username,
        allowedTaxIds: allowedTaxIds
    };
    return rest.patchId(resource, id, payload, user);
};
