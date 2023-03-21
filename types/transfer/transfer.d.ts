
declare module 'starkbank' {

    export class Transfer {
        /**
         *
         * Transfer object
         *
         * @description When you initialize a Transfer, the entity will not be automatically
         * created in the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (required):
         * @param amount [integer]: amount in cents to be transferred. ex: 1234 (= R$ 12.34)
         * @param name [string]: receiver full name. ex: 'Anthony Edward Stark'
         * @param taxId [string]: receiver tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         * @param bankCode [string]: code of the receiver bank institution in Brazil. If an ISPB (8 digits) is informed, a Pix transfer will be created, else a TED will be issued. ex: '20018183' or '341'
         * @param branchCode [string]: receiver bank account branch. Use '-' in case there is a verifier digit. ex: '1357-9'
         * @param accountNumber [string]: Receiver Bank Account number. Use '-' before the verifier digit. ex: '876543-2'
         * 
         * Parameters (optional):
         * @param accountType [string, default 'checking']: Receiver bank account type. This parameter only has effect on Pix Transfers. ex: 'checking', 'savings', 'salary' or 'payment'
         * @param externalId [string, default null]: url safe string that must be unique among all your transfers. Duplicated externalIds will cause failures. By default, this parameter will block any transfer that repeats amount and receiver information on the same date. ex: 'my-internal-id-123456'
         * @param scheduled [string, default now]: date or datetime when the transfer will be processed. May be pushed to next business day if necessary. ex: '2020-11-12T00:14:22.806+00:00' or '2020-11-30'
         * @param description [string, default null]: optional description to override default description to be shown in the bank statement. ex: 'Payment for service #1234'
         * @param tags [list of strings, default []]: list of strings for reference when searching for transfers. ex: ['employees', 'monthly']
         * @param rules [list of Transfer.Rules, default []]: list of Transfer.Rule objects for modifying transfer behavior. ex: [Transfer.Rule(key="resendingLimit", value=5)]
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when Transfer is created. ex: '5656565656565656'
         * @param fee [integer]: fee charged when transfer is created. ex: 200 (= R$ 2.00)
         * @param status [string]: current transfer status. ex: 'processing' or 'success'
         * @param transactionIds [list of strings]: ledger transaction ids linked to this transfer (if there are two, second is the chargeback). ex: ['19827356981273']
         * @param metadata [dictionary object]: dictionary object used to store additional information about the Transfer object.
         * @param created [string]: creation datetime for the transfer. ex: '2020-03-10 10:30:00.000'
         * @param updated [string]: latest update datetime for the transfer. ex: '2020-03-10 10:30:00.000'
         *
         */

        amount: number
        name: string
        taxId: string
        bankCode: string
        branchCode: string
        accountNumber: string

        accountType: string | null
        externalId: string | null
        scheduled: string | null
        description: string | null
        tags: string | null
        rules: transfer.Rule[] | null

        readonly id : string
        readonly fee : number
        readonly status : string
        readonly transactionIds : string[]
        readonly metadata : {}
        readonly created : string
        readonly updated : string
        

        constructor(params: {
            amount: number, name: string, taxId: string, bankCode: string, branchCode: string, accountNumber: string, 
            accountType?: string, externalId?: string, tags?: string[], rules?: transfer.Rule[], scheduled?: string, 
            description?: string | null, id?: string | null, fee?: number | null, status?: string | null, 
            transactionIds?: string[] | null, metadata?: {}, created?: string | null, updated?: string | null, 
        })
    }

    export namespace transfer {

        /**
         *
         * Create Transfers
         *
         * @description Send a list of Transfer objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param transfers [list of Transfer objects]: list of Transfer objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Transfer objects with updated attributes
         *
         */
        export function create(transfers: Transfer[], params?:{ user?: Project | Organization | null}): Promise<Transfer[]>;
        
        /**
         *
         * Retrieve a specific Transfer
         *
         * @description Receive a single Transfer object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Transfer object with updated attributes
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null}): Promise<Transfer>;

        /**
         *
         * Retrieve paged Transfers
         *
         * @description Receive a list of up to 100 Transfer objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param transactionIds [list of strings, default null]: list of transaction IDs linked to the desired transfers. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
         * @param taxId [string, default null]: filter for transfers sent to the specified tax ID.ex: '012.345.678-90'
         * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created', '-created', 'updated' or '-updated'.
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Transfer objects with updated attributes and cursor to retrieve the next page of Transfer objects
         *
         */
        export function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            transactionIds?: string[] | null, 
            status?: string | null, 
            taxId?: string | null, 
            sort?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[Transfer[], string | null]>;

        /**
         *
         * Retrieve a specific Transfer pdf file
         *
         * @description Receive a single Transfer pdf receipt file generated in the Stark Bank API by passing its id.
         * Only valid for transfers with 'processing' and 'success' status.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Transfer pdf file
         *
         */
        export function pdf(id: string, params?:{ user?: Project | Organization | null}): Promise<Buffer>;
        
        /**
         *
         * Retrieve Transfers
         *
         * @description Receive a generator of Transfer objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null]: date filter for objects created or updated only after specified date. ex: '2020-03-10'
         * @param before [string, default null]: date filter for objects created or updated only before specified date. ex: '2020-03-10'
         * @param transactionIds [list of strings, default null]: list of transaction IDs linked to the desired transfers. ex: ['5656565656565656', '4545454545454545']
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'success' or 'failed'
         * @param taxId [string, default null]: filter for transfers sent to the specified tax ID.ex: '012.345.678-90'
         * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created', '-created', 'updated' or '-updated'.
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of Transfer objects with updated attributes
         *
         */
        export function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            transactionIds?: string[] | null, 
            status?: string | null, 
            taxId?: string | null, 
            sort?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<Transfer[]>;
        
        /**
         *
         * Delete a Transfer entity
         *
         * @description Delete a Transfer entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: Transfer unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted Transfer object
         *
         */
        function _delete(id: string, user?: Project | Organization): Promise<Transfer>;
        export { _delete as delete }
        
        export class Rule {
            /**
             *
             * Transfer.Rule object
             *
             * @description The Transfer.Rule object modifies the behavior of Transfer objects when passed as an argument upon their creation.
             *
             * Parameters (required):
             * @param key [string]: Rule to be customized, describes what Transfer behavior will be altered. ex: "resendingLimit"
             * @param value [integer]: Value of the rule. ex: 5
             * 
             */
            key: string
            value: number

            constructor(params: {
                key: string,
                value: number 
            })
        }

        export class Log {
            /**
             *
             * Transfer Log object
             *
             * @description Every time a Transfer entity is modified, a corresponding Transfer Log
             * is generated for the entity. This log is never generated by the
             * user.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param transfer [Transfer]: Transfer entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this BoletoPayment event.
             * @param type [string]: type of the Transfer event which triggered the log creation. ex: 'processing' or 'success'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly transfer : Transfer
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, transfer: Transfer, errors: string[], type: string, created: string)
        }

        export namespace log {
            /**
             *
             * Retrieve a specific Transfer Log
             *
             * @description Receive a single Transfer Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns Transfer Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<transfer.Log>;

            /**
             *
             * Retrieve paged Transfer Logs
             *
             * @description Receive a list of up to 100 Transfer.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by types. ex: 'success' or 'failed'
             * @param transferIds [list of strings, default null]: list of Transfer ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Transfer Log objects with updated attributes and cursor to retrieve the next page of Boleto objects
             *
             */
            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                transferIds?: string[] | null, 
                user?: Project | Organization | null 
            }): Promise<[transfer.Log[], string | null]>;

            /**
             *
             * Retrieve Transfer Logs
             *
             * @description Receive a generator of Transfer Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter retrieved objects by types. ex: 'success' or 'failed'
             * @param transferIds [list of strings, default null]: list of Transfer ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Transfer Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                transferIds?: string[] | null, 
                user?: Project | Organization | null 
            }): Promise<transfer.Log[]>;
        }
    }
}
