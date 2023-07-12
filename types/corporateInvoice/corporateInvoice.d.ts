declare module 'starkbank' {

    export class CorporateInvoice {
        /**
        * 
        * CorporateInvoice object
        * 
        * @description The CorporateInvoice objects created in your Workspace load your Corporate balance when paid.
        * When you initialize a CorporateInvoice, the entity will not be automatically
        * created in the Stark Bank API. The 'create' function sends the objects
        * to the Stark Bank API and returns the created object.
        * 
        * Parameters (required):
        * 
        * @param amount [integer]: CorporateInvoice value in cents. ex: 1234 (= R$ 12.34)
        * 
        * Parameters (optional):
        * @param tags [list of strings, default []]: list of strings for tagging. ex: ["travel", "food"]
        * 
        * Attributes (return-only):
        * @param id [string]: unique id returned when CorporateInvoice is created. ex: "5656565656565656"
        * @param name [string, default sub-issuer name]: payer name. ex: "Iron Bank S.A."
        * @param taxId [string, default sub-issuer tax ID]: payer tax ID (CPF or CNPJ) with or without formatting. ex: "01234567890" or "20.018.183/0001-80"
        * @param brcode [string]: BR Code for the Invoice payment. ex: "00020101021226930014br.gov.bcb.pix2571brcode-h.development.starkbank.com/v2/d7f6546e194d4c64a153e8f79f1c41ac5204000053039865802BR5925Stark Bank S.A. - Institu6009Sao Paulo62070503***63042109"
        * @param due [string]: Invoice due and expiration date in UTC ISO format. ex: '2020-03-10 10:30:00.000'
        * @param link [string]: public Invoice webpage URL. ex: "https://starkbank-card-issuer.development.starkbank.com/invoicelink/d7f6546e194d4c64a153e8f79f1c41ac"
        * @param status [string]: current CorporateInvoice status. ex: "created", "expired", "overdue", "paid"
        * @param corporateTransactionId [string]: ledger transaction ids linked to this CorporateInvoice. ex: "corporate-invoice/5656565656565656"
        * @param updated [string] latest update datetime for the CorporateInvoice. ex: '2020-03-10 10:30:00.000'
        * @param created [string] creation datetime for the CorporateInvoice. ex: '2020-03-10 10:30:00.000'
        * 
        */

        amount: number

        tags: string[] | null

        readonly id : string | null
        readonly name : string | null
        readonly taxId : string | null
        readonly brcode : string | null
        readonly due : string | null
        readonly link : string | null
        readonly status : string | null
        readonly corporateTransactionId : string | null
        readonly updated : string | null
        readonly created : string | null

        constructor(params?: {
            amount: number, tags?: string[] | null,
            id?: string | null, name?: string | null,
            taxId?: string | null, brcode?: string | null, 
            due?: string | null, link?: string | null, 
            status?: string | null, corporateTransactionId?: string | null, 
            updated?: string | null, created?: string | null})

        }

        export namespace corporateInvoice {
        /**
        * 
        * Create CorporateInvoice
        * 
        * @description Send a CorporateInvoice object for creation at the Stark Bank API
        * 
        * Parameters (required):
        * @param invoice [CorporateInvoice object]: CorporateInvoice object to be created in the API.
        * 
        * Parameters (optional):
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        * 
        * Return:
        * @return CorporateInvoice object with updated attributes
        * 
        */

        function create(invoice: corporateInvoice, params?: { user?: Project | Organization | null }): Promise<corporateInvoice>

        /**
        * 
        * Retrieve CorporateInvoices
        * 
        * @description Receive a generator of CorporateInvoice objects previously created in the Stark Bank API
        * 
        * Parameters (optional):
        * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
        * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
        * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
        * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["created", "expired", "overdue", "paid"]
        * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        * 
        * Return:
        * @return generator of CorporateInvoice objects with updated attributes
        * 
        */

        function query(params?: {
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            types?: string[] | null, 
            holderIds?: string[] | null,
            user?: Project | Organization | null 
        }): Promise<corporateInvoice[]>

        /**
        * 
        * Retrieve CorporateInvoices
        * 
        * @description Receive a list of up to 100 CorporateInvoice objects previously created in the Stark Bank API and the cursor to the next page.
        * Use this function instead of query if you want to manually page your requests.
        * 
        * Parameters (optional):
        * @return cursor [string, default null]: cursor returned on the previous page function call
        * @return limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
        * @return after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
        * @return before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
        * @return status [list of strings, default null]: filter for status of retrieved objects. ex: ["created", "expired", "overdue", "paid"]
        * @return tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
        * @return user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        * 
        * Return:
        * @return list of CorporateInvoice objects with updated attributes
        * @return cursor to retrieve the next page of CorporateInvoice objects
        * 
        */

        function page(params?: {
            cursor?: string  | null,
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string[] | null, 
            tags?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[corporateInvoice[], string | null]>;
    }
}
