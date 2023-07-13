declare module 'starkbank' {

    export class CorporateTransaction {
        /**
         * 
         * CorporateTransaction object
         * 
         * @description The CorporateTransaction object created in your Workspace to represent each balance shift.
         * 
         * Attributes (return-only):
         * @param id [string]: unique id returned when CorporateTransaction is created. ex: "5656565656565656"
         * @param amount [integer]: CorporateTransaction value in cents. ex: 1234 (= R$ 12.34)
         * @param balance [integer]: balance amount of the Workspace at the instant of the Transaction in cents. ex: 200 (= R$ 2.00)
         * @param description [string]: CorporateTransaction description. ex: "Buying food"
         * @param source [string]: source of the transaction. ex: "corporate-purchase/5656565656565656"
         * @param tags [string]: list of strings inherited from the source resource. ex: ["tony", "stark"]
         * @param created [string]: creation datetime for the CorporateTransaction. ex: '2020-03-10 10:30:00.000'
         * 
         */

        readonly id : string
        readonly amount : number
        readonly balance : number
        readonly description : string
        readonly source : string
        readonly tags : string
        readonly created : string

        constructor(params: {
            id?: string | null, 
            amount?: string | null, 
            balance?: string | null, 
            description?: string | null, 
            source?: string | null, 
            tags?: string | null, 
            created?: string | null
        })
    }

    export namespace corporateTransaction {
        /**
         * 
         * Retrieve a specific CorporateTransaction
         * 
         * @description Receive a single CorporateTransaction object previously created in the Stark Bank API by its id
         * 
         * Parameters (required):
         * @param id [string]: object unique id. ex: "5656565656565656"
         * 
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
         * 
         * Return:
         * @param CorporateTransaction object with updated attributes
         * 
         */

        function get(id: string, params?: { user?: Project | Organization | null }): Promise<CorporateTransaction>

        /**
         * 
         * Retrieve CorporateTransaction
         * 
         * @descrption Receive a generator of CorporateTransaction objects previously created in the Stark Bank API
         * 
         * Parameters (optional):
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
         * @param externalIds [list of strings, default null]: external IDs. ex: ["5656565656565656", "4545454545454545"]
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: "approved", "canceled", "denied", "confirmed" or "voided"
         * @param ids [list of strings, default null]: purchase IDs
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
         * 
         * Return:
         * @param generator of CorporateTransaction objects with updated attributes
         * 
         */

        function query(params?: {
            tags?: string[] | null, 
            externalIds?: string[] | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            ids?: string[] | null, 
            limit?: number | null, 
            user?: Project | Organization | null
        }): Promise<CorporateTransaction[]>

        /**
         * 
         * Retrieve paged CorporateTransaction
         * 
         * @description Receive a list of up to 100 CorporateTransaction objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
         * @param externalIds [list of strings, default null]: external IDs. ex: ["5656565656565656", "4545454545454545"]
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: "approved", "canceled", "denied", "confirmed" or "voided"
         * @param ids [list of strings, default null]: purchase IDs
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
         * 
         * Return:
         * @return list of CorporateTransaction objects with updated attributes
         * @return cursor to retrieve the next page of CorporatePurchase objects
         * 
         */

        function page(params?: {
            cursor?: string | null, 
            limit?: number | null, 
            tags?: string[] | null, 
            externalIds?: string[] | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[CorporateTransaction[], string | null]>;
    }
}
