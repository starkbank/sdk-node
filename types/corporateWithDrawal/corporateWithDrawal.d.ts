declare module 'starkbank' {

    export class CorporateWithdrawal {
    /**
    * 
    * CorporateWithdrawal object
    * 
    * @description The CorporateWithdrawal objects created in your Workspace return cash from your Corporate balance to your
    * Banking balance.
    * 
    * Parameters (required):
    * @param amount [integer]: CorporateWithdrawal value in cents. Minimum = 0 (any value will be accepted). ex: 1234 (= R$ 12.34)
    * @param externalId [string] CorporateWithdrawal external ID. ex: "12345"
    * 
    * Parameters (optional):
    * @param tags [list of strings, default []]: list of strings for tagging. ex: ["tony", "stark"]
    * 
    * Attributes (return-only):
    * @param id [string]: unique id returned when CorporateWithdrawal is created. ex: "5656565656565656"
    * @param transactionId [string]: Stark Bank ledger transaction ids linked to this CorporateWithdrawal
    * @param corporateTransactionId [string]: corporate ledger transaction ids linked to this CorporateWithdrawal
    * @param updated [string] latest update datetime for the CorporateWithdrawal. ex: '2020-03-10 10:30:00.000'
    * @param created [string] creation datetime for the CorporateWithdrawal. ex: '2020-03-10 10:30:00.000'
    * 
    */

    amount: number
    externalId: string

    tags: string[]

    readonly id : string
    readonly transactionId : string
    readonly corporateTransactionId : string
    readonly updated : string
    readonly created : string

    constructor(params?: {
        amount?: number | null, externalId?: string | null,
        tags?: string[] | null, id?: string | null,
        transactionId?: string | null, corporateTransactionId?: string | null,
        updated?: string | null, created?: string | null})

    }

    export namespace corporateWithdrawal {
    /**
    *
    * Create a CorporateWithdrawal
    * 
    * @description Send a single CorporateWithdrawal object for creation at the Stark Bank API
    * 
    * Parameters (required):
    * @param withdrawal [CorporateWithdrawal object]: CorporateWithdrawal object to be created in the API.
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return CorporateWithdrawal object with updated attributes
    * 
    */

    function create(withdrawal: CorporateWithdrawal, params?: { user?: Project | Organization | null }): Promise<CorporateWithdrawal>

    /**
    *
    * Retrieve a specific CorporateWithdrawal
    * 
    * @description Receive a single CorporateWithdrawal object previously created in the Stark Bank API by its id
    * 
    * Parameters (required):
    * @param id [string]: object unique id. ex: "5656565656565656"
    * 
    * Parameters (optional):
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return CorporateWithdrawal object with updated attributes
    * 
    */

    function get(id: string, params?: { user?: Project | Organization | null }): Promise<CorporateWithdrawal>

    /**
    * 
    * Retrieve CorporateWithdrawals
    * 
    * @descrption Receive a generator of CorporateWithdrawal objects previously created in the Stark Bank API
    * 
    * Parameters (optional):
    * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
    * @param externalIds [list of strings, default null]: external IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return generator of CorporateWithdrawal objects with updated attributes
    * 
    */

    function query(params?: {
        limit?: number,
        externalIds?: string[],
        after?: string,
        before?: string,
        tags?: string[],
        user?: Project | Organization | null
    }): Promise<CorporateWithdrawal[]>

    /**
    * 
    * Retrieve paged CorporateWithdrawals
    * 
    * @description Receive a list of up to 100 CorporateWithdrawal objects previously created in the Stark Bank API and the cursor to the next page.
    * Use this function instead of query if you want to manually page your requests.
    * 
    * Parameters (optional):
    * @param cursor [string, default null]: cursor returned on the previous page function call
    * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
    * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
    * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
    * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
    * @param externalIds [list of strings, default null]: external IDs. ex: ["5656565656565656", "4545454545454545"]
    * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
    * 
    * Return:
    * @return list of CorporateWithdrawal objects with updated attributes
    * @return cursor to retrieve the next page of CorporateWithdrawal objects
    * 
    */

    function page(params?: {cursor?: string
        limit?: number,
        after?: string,
        before?: string,
        tags?: string[],
        externalIds?: string[],
        user?: Project | Organization | null
    }): Promise<[CorporateWithdrawal[], string | null]>;
    }
}
