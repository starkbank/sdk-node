
declare module 'starkbank' {
    
    export class Boleto {
        /**
         *
         * Boleto object
         *
         * @description When you initialize a Boleto, the entity will not be automatically
         * sent to the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         *
         * Parameters (required):
         * @param amount [integer]: Boleto value in cents. Minimum = 200 (R$2,00). ex: 1234 (= R$ 12.34)
         * @param name [string]: payer full name. ex: 'Anthony Edward Stark'
         * @param taxId [string]: payer tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         * @param streetLine1 [string]: payer main address. ex: Av. Paulista, 200
         * @param streetLine2 [string]: payer address complement. ex: Apto. 123
         * @param district [string]: payer address district / neighbourhood. ex: Bela Vista
         * @param city [string]: payer address city. ex: Rio de Janeiro
         * @param stateCode [string]: payer address state. ex: GO
         * @param zipCode [string]: payer address zip code. ex: 01311-200
         *
         * Parameters (optional):
         * @param due [string, default today + 2 days]: Boleto due date in ISO format. ex: 2020-04-30
         * @param fine [float, default 0.0]: Boleto fine for overdue payment in %. ex: 2.5
         * @param interest [float, default 0.0]: Boleto monthly interest for overdue payment in %. ex: 5.2
         * @param overdueLimit [integer, default 59]: limit in days for payment after due date. ex: 7 (max: 59)
         * @param receiverName [string]: receiver (Sacador Avalista) full name. ex: 'Anthony Edward Stark'
         * @param receiverTaxId [string]: receiver (Sacador Avalista) tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         * @param descriptions [list of dictionaries, default null]: list of dictionaries with 'text':string and (optional) 'amount':int pairs
         * @param discounts [list of dictionaries, default null]: list of dictionaries with 'percentage':float and 'date':string pairs
         * @param tags [list of strings]: list of strings for tagging
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when Boleto is created. ex: '5656565656565656'
         * @param fee [integer]: fee charged when Boleto is paid. ex: 200 (= R$ 2.00)
         * @param line [string]: generated Boleto line for payment. ex: '34191.09008 63571.277308 71444.640008 5 81960000000062'
         * @param barCode [string]: generated Boleto bar-code for payment. ex: '34195819600000000621090063571277307144464000'
         * @param status [string]: current Boleto status. ex: 'registered' or 'paid'
         * @param transactionIds [list of strings]: ledger transaction ids linked to this Invoice (if there are more than one, all but the first are reversals or failed reversal chargebacks). ex: ['19827356981273']
         * @param workspaceId [string]: ID of the Workspace where this Boleto was generated. ex: "4545454545454545"
         * @param created [string]: creation datetime for the Boleto. ex: '2020-03-10 10:30:00.000'
         * @param ourNumber [string]: Reference number registered at the settlement bank. ex:“10131474”
         *
         */

        amount : number
        name : string
        taxId : string
        streetLine1 : string
        streetLine2 : string
        district : string
        city : string
        stateCode : string
        zipCode : string

        due : string | null
        fine : number | null
        interest : number | null
        overdueLimit : number | null
        receiverName : string | null
        receiverTaxId : string | null
        descriptions : {
            text : string
            amount? : number
        }[] | null
        discounts : {
            percentage : number
            date : string
        }[] | null
        tags : string[] | null
        
        readonly id : string
        readonly fee : number
        readonly line : string
        readonly barCode : string
        readonly status : string
        readonly transactionIds : string[]
        readonly workspaceId : string
        readonly created : string
        readonly ourNumber : string

        constructor(params: {
            amount: number, name: string, taxId: string, streetLine1: string, streetLine2: string, district: string, 
            city: string, stateCode: string, zipCode: string, due? : string | null, fine? : number | null, 
            interest? : number | null, overdueLimit? : number | null, receiverName? : string | null, receiverTaxId? : string | null, 
            tags? : string[] | null, descriptions? : {text : string, amount? : number}[] | null, 
            discounts? : {percentage : number, date : string}[] | null, id?: string | null, fee? : number | null, 
            line? : string | null, barCode? : string | null, status? : string | null, transactionIds? : string[] | null, 
            workspaceId? : string | null, created? : string | null, ourNumber? : string | null
        })
    }

    export namespace boleto {

        /**
         *
         * Create Boletos
         *
         * @description Send a list of Boleto objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param boletos [list of Boleto objects]: list of Boleto objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Boleto objects with updated attributes
         *
         */
        export function create(boletos: Boleto[] | {}[], params?:{ user?: Project | Organization | null }): Promise<Boleto[]>;
    
        /**
         *
         * Retrieve a specific Boleto
         *
         * @description Receive a single Boleto object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         * 
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @returns Boleto object with updated attributes
         *
         */
        export function get(id: string, params?:{ user?: Project | Organization | null }): Promise<Boleto>;

        /**
         *
         * Retrieve Boletos
         *
         * @description Receive a generator of Boleto objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'paid' or 'registered'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of Boleto objects with updated attributes
         *
         */
        export function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<Boleto[]>

        /**
         *
         * Retrieve paged Boletos
         *
         * @description Receive a list of up to 100 Boleto objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'paid' or 'registered'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Boleto objects with updated attributes and cursor to retrieve the next page of Boleto objects
         *
         */
        export function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[Boleto[], string | null]>

        /**
         *
         * Delete a Boleto entity
         *
         * @description Delete a Boleto entity previously created in the Stark Bank API
         *
         * Parameters (required):
         * @param id [string]: Boleto unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns deleted Boleto object
         *
         */
        function _delete(id: string, params?:{ user?: Project | Organization | null }): Promise<Boleto>;
        export { _delete as delete }
        /**
         *
         * Retrieve a specific Boleto pdf file
         *
         * @description Receive a single Boleto pdf file generated in the Stark Bank API by passing its id.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param layout [string, default 'default']: Layout specification. Available options are 'default' and 'booklet'
         * @param hiddenFields [list of strings, default null]: List of string fields to be hidden in Boleto pdf. ex: ['customerAddress']
         * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Boleto pdf file
         *
         */
        
        export function pdf(id: string, params?: { 
            layout?: string, 
            hiddenFields?: string[], 
            user?: Project | Organization | null 
        }): Promise<Buffer>;

        export class Log {
            /**
             *
             * Boleto Log object
             *
             * @description Every time a Boleto entity is updated, a corresponding Boleto Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the Boleto.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param boleto [Boleto]: Boleto entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this Boleto event
             * @param type [string]: type of the Boleto event which triggered the log creation. ex: 'registered' or 'paid'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly boleto : Boleto
            readonly errors : string[]
            readonly type : string
            readonly created : string

            constructor(id: string, boleto: Boleto, errors: string[], type: string, created: string)
        }

        export namespace log {

            /**
             *
             * Retrieve a specific Boleto Log
             *
             * @description Receive a single Boleto Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns Boleto Log object with updated attributes
             *
             */
            export function get(id: string, params?: { user?: Project | Organization | null}): Promise<boleto.Log>;

            /**
             *
             * Retrieve paged Boleto Logs
             *
             * @description Receive a list of up to 100 Boleto.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
             * @param boletoIds [list of strings, default null]: list of Boleto ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Boleto Log objects with updated attributes and cursor to retrieve the next page of Boleto objects
             *
             */
            export function page(params?: { 
                cursor?: string  | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                boletoIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[boleto.Log[], string | null]>;

            /**
             *
             * Retrieve Boleto Logs
             *
             * @description Receive a generator of Boleto Log objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
             * @param boletoIds [list of strings, default null]: list of Boleto ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Boleto Log objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                boletoIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<boleto.Log[]>;
        }
    
    }
}
