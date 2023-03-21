
declare module 'starkbank' {

    export class Workspace {
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
         * Parameters (optional):
         * @param allowedTaxIds [list of strings, default null]: list of tax IDs that will be allowed to send Deposits to this Workspace. If empty, all are allowed. ex: ['012.345.678-90', '20.018.183/0001-80']
         * 
         * Attributes:
         * @param id [string, default null]: unique id returned when the workspace is created. ex: '5656565656565656'
         * @param status [string]: current Workspace status. Options: "active", "closed", "frozen" or "blocked"
         * @param organizationId [string]: unique organization id returned when the organization is created. ex: "5656565656565656"
         * @param pictureUrl [string]: public workspace image (png) URL. ex: "https://storage.googleapis.com/api-ms-workspace-sbx.appspot.com/pictures/workspace/6284441752174592.png?20230208220551"
         * @param created [string]: creation datetime for the workspace. ex: '2020-03-10 10:30:00.000'
         */

        username: string
        name: string

        allowedTaxIds: string[]

        id: string
        status: string
        organizationId: string
        pictureUrl: string
        created: string

        constructor(params: {
            username: string, name: string, allowedTaxIds?: string[], id?: string | null, 
            status?: string | null, organizationId?: string | null, pictureUrl?: string | null, 
            created?: string | null
        })

    }
    
    export namespace workspace {
        /**
         * Create Workspace
         * 
         * @description Send a Workspace for creation in the Stark Bank API
         * 
         * Parameters (required):
         * @param username [string]: Simplified name to define the workspace URL. This name must be unique across all Stark Bank Workspaces. Ex: 'starkbankworkspace'
         * @param name [string]: Full name that identifies the Workspace. This name will appear when people access the Workspace on our platform, for example. Ex: 'Stark Bank Workspace'
         * @param allowedTaxIds [list of strings]: list of tax IDs that will be allowed to send Deposits to this Workspace. ex: ['012.345.678-90', '20.018.183/0001-80']
         * 
         * Parameters (optional):
         * @param user [Organization object]: Organization object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns Workspace object with updated attributes
         * 
         */
        function create(params?: {username: string, name: string, allowedTaxIds?: string[],  user?: Project | Organization | null}): Promise<Workspace>;

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
        function get(id: string, params?:{ user?: Project | Organization | null}): Promise<Workspace>;

        /**
         * 
         * Retrieve paged Workspaces
         * 
         * @description Receive a list of up to 100 Workspace objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param username [string]: page by the simplified name that defines the workspace URL. This name is always unique across all Stark Bank Workspaces. Ex: 'starkbankworkspace'
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns list of Workspace objects with updated attributes and cursor to retrieve the next page of Workspace objects
         * 
         */
        function page(params?: {
            cursor?: string | null, 
            limit?: number | null, 
            username?: string | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[Workspace[], string | null]>;

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
        function query(params?: {
            limit?: number | null, 
            username?: string | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<Workspace[]>;

        /**
         * 
         * Update a Workspace entity
         * 
         * @description Update a Workspace by passing its ID.
         * 
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         * 
         * Parameters (conditionally required):
         * @param pictureType [string]: picture mime type. This parameter will be required if the picture parameter is informed ex: ‘image/png’ or ‘image/jpeg’
         * 
         * Parameters (optional):
         * @param name [string, default null]: Full name that identifies the Workspace. This name will appear when people access the Workspace on our platform, for example. Ex: 'Stark Bank Workspace'
         * @param username [string, default null]: Simplified name to define the workspace URL. This name must be unique across all Stark Bank Workspaces. Ex: 'starkbank-workspace'
         * @param allowedTaxIds [list of strings, default null]: list of tax IDs that will be allowed to send Deposits to this Workspace. If empty, all are allowed. ex: ['012.345.678-90', '20.018.183/0001-80']
         * @param status [string, default null]: current Workspace status. ex: 'active' or 'blocked'
         * @param picture [Buffer, default null]: Binary buffer of the picture. ex: fs.readFileSync("/path/to/file.png")
         * @param user [Organization/Project object]: Organization or Project object.Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns target Workspace with updated attributes
         * 
         */
        function update(id: string, params?: {
            username?: string, 
            name?: string, 
            allowedTaxIds?: string[], 
            status?: string,
            picture?: Buffer[],
            pictureType?: string,
            user?: Project | Organization | null
        }): Promise<Workspace>;
    }
}
