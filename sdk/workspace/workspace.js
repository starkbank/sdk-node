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

exports.create = async function create(username, name, {user} = {}) {
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

exports.get = async function get(id, {user} = {}){
    /**
     * 
     * Retrieve a specific Workspace subscription
     * 
     * Receive a single Workspace subscription object previously created in the Stark Bank API by passing its id
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

exports.query = async function query({limit, username, ids, user} = {}){
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
        ids: ids,
        user: user
    };
    return rest.getList(resource, query, user);
};


