
declare module 'starkbank' {

    export class Deposit {
        /**
         * 
         * Deposit object
         * 
         * @description Deposits represent passive cash-in received by your account from external transfers
         * 
         * Parameters (return-only):
         * @param id [string]: unique id associated with a Deposit when it is created. ex: '5656565656565656'
         * @param name [string]: payer name. ex: 'Iron Bank S.A.'
         * @param taxId [string]: payer tax ID (CPF or CNPJ). ex: '012.345.678-90' or '20.018.183/0001-80'
         * @param bankCode [string]: payer bank code in Brazil. ex: '20018183' or '341'
         * @param branchCode [string]: payer bank account branch. ex: '1357-9'
         * @param accountNumber [string]: payer bank account number. ex: '876543-2'
         * @param accountType [string]: payer bank account type. ex: 'checking'
         * @param amount [integer]: Deposit value in cents. ex: 1234 (= R$ 12.34)
         * @param type [string]: type of settlement that originated the deposit. ex: 'pix' or 'ted'
         * @param status [string]: current Deposit status. ex: 'created'
         * @param tags [list of strings]: list of strings that are tagging the deposit. ex: ['reconciliationId', 'taxId']
         * @param fee [integer]: fee charged when a deposit is created. ex: 50 (= R$ 0.50)
         * @param transactionIds [list of strings]: ledger transaction ids linked to this deposit (if there are more than one, all but first are reversals). ex: ['19827356981273']
         * @param created [string]: creation datetime for the Deposit. ex: '2020-03-10 10:30:00.000'
         * @param updated [string]: latest update datetime for the Deposit. ex: '2020-03-10 10:30:00.000'
         */

        id: string
        name: string
        taxId: string
        bankCode: string
        branchCode: string
        accountNumber: string
        accountType: string
        amount: number
        type: string
        status: string
        tags: string[]
        fee: number
        transactionIds: string[]
        created: string
        updated: string

        constructor(params: {
            id: string, name: string, taxId: string, bankCode: string, branchCode: string, accountNumber: string, accountType: string, amount: number,
            type: string, status: string, tags: string[], fee: number, transactionIds: string[], created: string, updated: string
        })
    }

    export namespace deposit {
        /**
         *
         * Retrieve a specific Deposit
         *
         * @description Receive a single Deposit object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns Deposit object with updated attributes
         *
         */
        function get(id: string, params?:{ user?: Project | Organization | null}): Promise<Deposit>;

        /**
         *
         * Retrieve paged Deposits
         *
         * @description Receive a list of up to 100 Deposit objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'created'
         * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created' or '-created'.
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Deposit objects with updated attributes and cursor to retrieve the next page of Deposit objects
         *
         */
        function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            sort?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[Deposit[], string | null]>;

        /**
         *
         * Retrieve Deposits
         *
         * @description Receive a generator of Deposit objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'created'
         * @param sort [string, default '-created']: sort order considered in response. Valid options are 'created' or '-created'.
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of Deposit objects with updated attributes
         *
         */
        function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            sort?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<Deposit[]>;

        export class Log {
            /**
             *
             * Deposit Log object
             *
             * @description Every time a Deposit entity is updated, a corresponding Deposit Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the Deposit.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param deposit [Deposit]: Deposit entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this Deposit event
             * @param type [string]: type of the Deposit event which triggered the log creation. ex: 'created'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly deposit : Deposit
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, deposit: Deposit, errors: string[], type: string, created: string)
        }

        namespace log {
            /**
             *
             * Retrieve a specific Deposit Log
             *
             * @description Receive a single Deposit Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns Deposit Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<deposit.Log>;

            /**
             *
             * Retrieve paged Deposit Logs
             *
             * @description Receive a list of up to 100 Deposit.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'created'
             * @param depositIds [list of strings, default null]: list of Deposit ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Deposit Log objects with updated attributes and cursor to retrieve the next page of Deposit.Log objects
             *
             */
            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                depositIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[deposit.Log[], string | null]>;

            /**
             *
             * Retrieve Deposit Logs
             *
             * @description Receive a generator of Deposit Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'created'
             * @param depositIds [list of strings, default null]: list of Deposit ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Deposit Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                depositIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<deposit.Log[]>;
        }
    }
}
