
declare module 'starkbank' {

    export class VerifiedAccount {
        /**
         *
         * VerifiedAccount object
         *
         * @description When you initialize a VerifiedAccount, the entity will not be automatically
         * created in the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (required):
         * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         *
         * Parameters (conditionally required):
         * @param bankCode [string]: code of the receiver bank institution in Brazil. If an ISPB (8 digits) is informed, a Pix transfer will be created, else a TED will be issued. The bankCode parameter is required if verifying with bank details. ex: '20018183' or '341'
         * @param branchCode [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'. The branchCode parameter is required if verifying with bank details.
         * @param keyId [string]: pix key identifier. ex: 'tony@starkbank.com', '012.345.678-90'. The keyId parameter is required if verifying with Pix key.
         * @param name [string]: receiver full name. ex: 'Anthony Edward Stark'. The name parameter is required if verifying with bank details.
         * @param number [string]: receiver bank account number. Use '-' before the verifier digit. ex: '876543-2'. The number parameter is required if verifying with bank details.
         * @param type [string]: verified account type. ex: 'checking', 'savings', 'salary' or 'payment'. The type parameter is required if verifying with bank details.
         *
         * Parameters (optional):
         * @param tags [list of strings, default []]: list of strings for reference when searching for verified accounts. ex: ['employees', 'monthly']
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when the VerifiedAccount is created. ex: '5656565656565656'
         * @param bankName [string]: bank name associated with the verified account. ex: 'Stark Bank'
         * @param status [string]: current verified account status. ex: 'creating', 'created', 'processing', 'active', 'failed' or 'canceled'
         * @param created [string]: creation datetime for the verified account. ex: '2020-03-10 10:30:00.000'
         * @param updated [string]: update datetime for the verified account. ex: '2020-03-10 10:30:00.000'
         *
         */

        taxId: string

        bankCode: string | null
        branchCode: string | null
        keyId: string | null
        name: string | null
        number: string | null
        type: string | null
        tags: string[] | null

        readonly id: string
        readonly bankName: string
        readonly status: string
        readonly created: string
        readonly updated: string

        constructor(params: {
            taxId: string,
            bankCode?: string | null,
            branchCode?: string | null,
            keyId?: string | null,
            name?: string | null,
            number?: string | null,
            type?: string | null,
            tags?: string[] | null,
            id?: string | null,
            bankName?: string | null,
            status?: string | null,
            created?: string | null,
            updated?: string | null,
        })
    }

    export namespace verifiedAccount {

        /**
         *
         * Create VerifiedAccounts
         *
         * @description Send a list of VerifiedAccount objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param verifiedAccounts [list of VerifiedAccount objects]: list of VerifiedAccount objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of VerifiedAccount objects with updated attributes
         *
         */
        export function create(verifiedAccounts: VerifiedAccount[], params?: { user?: Project | Organization | null }): Promise<VerifiedAccount[]>;

        /**
         *
         * Retrieve a specific VerifiedAccount
         *
         * @description Receive a single VerifiedAccount object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns VerifiedAccount object with updated attributes
         *
         */
        export function get(id: string, params?: { user?: Project | Organization | null }): Promise<VerifiedAccount>;

        /**
         *
         * Cancel a VerifiedAccount entity
         *
         * @description Cancel a VerifiedAccount entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: VerifiedAccount unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns canceled VerifiedAccount object
         *
         */
        export function cancel(id: string, params?: { user?: Project | Organization | null }): Promise<VerifiedAccount>;

        /**
         *
         * Retrieve VerifiedAccounts
         *
         * @description Receive a generator of VerifiedAccount objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'creating', 'created', 'processing', 'active', 'failed' or 'canceled'
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of VerifiedAccount objects with updated attributes
         *
         */
        export function query(params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string | null,
            ids?: string[] | null,
            tags?: string[] | null,
            user?: Project | Organization | null
        }): Promise<VerifiedAccount[]>;

        /**
         *
         * Retrieve paged VerifiedAccounts
         *
         * @description Receive a list of up to 100 VerifiedAccount objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default 100]: maximum number of objects to be retrieved. It must be an integer between 1 and 100. ex: 50
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'creating', 'created', 'processing', 'active', 'failed' or 'canceled'
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of VerifiedAccount objects with updated attributes and cursor to retrieve the next page of VerifiedAccount objects
         *
         */
        export function page(params?: {
            cursor?: string | null,
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string | null,
            ids?: string[] | null,
            tags?: string[] | null,
            user?: Project | Organization | null
        }): Promise<[VerifiedAccount[], string | null]>;

        export class Log {
            /**
             *
             * VerifiedAccount Log object
             *
             * @description Every time a VerifiedAccount entity is modified, a corresponding VerifiedAccount Log
             * is generated for the entity. This log is never generated by the user.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param account [VerifiedAccount]: VerifiedAccount entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this VerifiedAccount event.
             * @param type [string]: type of the VerifiedAccount event which triggered the log creation. ex: 'created' or 'processing'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id: string
            readonly account: VerifiedAccount
            readonly errors: string[]
            readonly type: string
            readonly created: string

            constructor(id: string, account: VerifiedAccount, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             *
             * Retrieve a specific VerifiedAccount Log
             *
             * @description Receive a single VerifiedAccount Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns VerifiedAccount Log object with updated attributes
             *
             */
            function get(id: string, params?: { user?: Project | Organization | null }): Promise<verifiedAccount.Log>;

            /**
             *
             * Retrieve paged VerifiedAccount Logs
             *
             * @description Receive a list of up to 100 VerifiedAccount.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by types. ex: 'created' or 'processing'
             * @param accountIds [list of strings, default null]: list of VerifiedAccount ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of VerifiedAccount Log objects with updated attributes and cursor to retrieve the next page of VerifiedAccount.Log objects
             *
             */
            function page(params?: {
                cursor?: string | null,
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                accountIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<[verifiedAccount.Log[], string | null]>;

            /**
             *
             * Retrieve VerifiedAccount Logs
             *
             * @description Receive a generator of VerifiedAccount Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by types. ex: 'created' or 'processing'
             * @param accountIds [list of strings, default null]: list of VerifiedAccount ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of VerifiedAccount Log objects with updated attributes
             *
             */
            function query(params?: {
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                accountIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<verifiedAccount.Log[]>;
        }
    }
}
