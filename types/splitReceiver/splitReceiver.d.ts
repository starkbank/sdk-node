
declare module 'starkbank' {

    export class SplitReceiver {
        /**
         * 
         * SplitReceiver object
         * 
         * @description When you initialize a SplitReceiver, the entity will not be automatically
         * sent to the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (required):
         * @param name [string]: receiver full name. ex: 'Anthony Edward Stark'
         * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         * @param bankCode [string]: code of the receiver bank institution in Brazil. ex: '20018183'
         * @param branchCode [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'
         * @param accountNumber [string]: receiver Bank Account number. Use '-' before the verifier digit. ex: '876543-2'
         * @param accountType [string]: Receiver bank account type. This parameter only has effect on Pix Transfers. ex: 'checking', 'savings', 'salary' or 'payment'
         * 
         * Parameters (optional):
         * @param tags [list of strings, default []]: list of strings for tagging. ex: ['travel', 'food']
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when SplitReceiver is created. ex: '5656565656565656'
         * @param status [string]: current SplitReceiver status. ex: 'created', 'canceled', 'updated'
         * @param created [string]: creation datetime for the SplitReceiver. ex: '2020-03-10 10:30:00.000000+00:00'
         * @param updated [string]: update datetime for the SplitReceiver. ex: '2020-03-10 10:30:00.000000+00:00'
         * 
         */

        name: string
        taxId: string
        bankCode: string
        branchCode: string
        accountNumber: string
        accountType: string

        tags: string[] | null

        readonly id: string
        readonly status: string
        readonly created: string
        readonly updated: string

        constructor(params: {
            name: string, taxId: string, bankCode: string, branchCode: string, accountNumber: string, accountType: string,
            tags?: string[] | null, id?: string | null, status?: string | null, created?: string | null, updated?: string | null
        })
    }

    export namespace splitReceiver {

        /**
         *
         * Create SplitReceivers
         * 
         * @description Send a list of SplitReceiver objects for creation in the Stark Bank API
         * 
         * Parameters (required):
         * @param receivers [list of SplitReceiver objects]: list of SplitReceiver objects to be created in the API
         * 
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns list of SplitReceiver objects with updated attributes
         * 
         */
        function create(receivers: SplitReceiver[], params?: { user?: Project | Organization | null }): Promise<SplitReceiver[]>;

        /**
         *
         * Retrieve a specific SplitReceiver
         * 
         * @description Receive a single SplitReceiver object previously created in the Stark Bank API by its id
         * 
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns SplitReceiver object with updated attributes
         * 
         */
        function get(id: string, params?: { user?: Project | Organization | null }): Promise<SplitReceiver>;

        /**
         * 
         * Retrieve SplitReceivers
         * 
         * @description Receive a generator of SplitReceiver objects previously created in the Stark Bank API
         * 
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'created', 'canceled', 'updated'
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns generator of SplitReceiver objects with updated attributes
         * 
         */
        function query(params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            tags?: string[] | null,
            ids?: string[] | null,
            status?: string | null,
            user?: Project | Organization | null
        }): Promise<SplitReceiver[]>;

        /**
         * 
         * Retrieve paged SplitReceivers
         * 
         * @description Receive a list of up to 100 SplitReceiver objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'created', 'canceled', 'updated'
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns list of SplitReceiver objects with updated attributes and cursor to retrieve the next page of SplitReceiver objects
         * 
         */
        function page(params?: {
            cursor?: string | null,
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            tags?: string[] | null,
            ids?: string[] | null,
            status?: string | null,
            user?: Project | Organization | null
        }): Promise<[SplitReceiver[], string | null]>;

        export class Log {
            /**
             * 
             * SplitReceiver Log object
             * 
             * @description Every time a SplitReceiver entity is updated, a corresponding SplitReceiver Log
             * is generated for the entity. This log is never generated by the user,
             * but it can be retrieved to check additional information on the SplitReceiver.
             * 
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param receiver [SplitReceiver]: SplitReceiver entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this SplitReceiver event.
             * @param type [string]: type of the SplitReceiver event which triggered the log creation. ex: 'canceled', 'created', 'failed', 'processing', 'success' or 'updated'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             * 
             */
            readonly id: string
            readonly receiver: SplitReceiver
            readonly errors: string[]
            readonly type: string
            readonly created: string

            constructor(id: string, receiver: SplitReceiver, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             * 
             * Retrieve a specific SplitReceiver Log
             * 
             * @description Receive a single SplitReceiver Log object previously created by the Stark Bank API by passing its id
             * 
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             * 
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @returns SplitReceiver Log object with updated attributes
             * 
             */
            function get(id: string, params?: { user?: Project | Organization | null }): Promise<SplitReceiver.Log>;

            /**
             * 
             * Retrieve SplitReceiver Logs
             * 
             * @description Receive a generator of SplitReceiver Log objects previously created in the Stark Bank API
             * 
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'canceled', 'created', 'failed', 'processing', 'success' or 'updated'
             * @param receiverIds [list of strings, default null]: list of SplitReceiver ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @returns list of SplitReceiver Log objects with updated attributes
             * 
             */
            function query(params?: {
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                receiverIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<SplitReceiver.Log[]>;

            /**
             * 
             * Retrieve paged SplitReceiver Logs
             * 
             * @description Receive a list of up to 100 SplitReceiver Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             * 
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'canceled', 'created', 'failed', 'processing', 'success' or 'updated'
             * @param receiverIds [list of strings, default null]: list of SplitReceiver ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @returns list of SplitReceiver Log objects with updated attributes and cursor to retrieve the next page of SplitReceiver Log objects
             * 
             */
            function page(params?: {
                cursor?: string | null,
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                receiverIds?: string[] | null,
                user?: Project | Organization | null
            }): Promise<[SplitReceiver.Log[], string | null]>;
        }
    }
}
