
declare module 'starkbank' {

    export class Invoice {
        /**
         *
         * Invoice object
         *
         * @description When you initialize an Invoice, the entity will not be automatically
         * sent to the Stark Bank API. The 'create' function sends the objects
         * to the Stark Bank API and returns the list of created objects.
         * To create scheduled Invoices, which will display the discount, interest, etc. on the final users banking interface,
         * use dates instead of datetimes on the "due" and "discounts" fields.
         *
         * Parameters (required):
         * @param amount [integer]: Invoice value in cents. Minimum = 0 (R$0,00). ex: 1234 (= R$ 12.34)
         * @param taxId [string]: payer tax ID (CPF or CNPJ) with or without formatting. ex: '01234567890' or '20.018.183/0001-80'
         * @param name [string]: payer name. ex: 'Iron Bank S.A.'
         *
         * Parameters (optional):
         * @param due [string, default now + 2 days]: Invoice due date in UTC ISO format. ex: '2020-11-25T17:59:26.249976+00:00'
         * @param expiration [integer, default 59 days]: time interval in seconds between due date and expiration date. ex 123456789
         * @param fine [float, default 2.0]: Invoice fine for overdue payment in %. ex: 2.5
         * @param interest [float, default 1.0]: Invoice monthly interest for overdue payment in %. ex: 5.2
         * @param discounts [list of dictionaries, default null]: list of dictionaries with 'percentage':float and 'due':string pairs
         * @param tags [list of strings, default null]: list of strings for tagging
         * @param descriptions [list of dictionaries, default null]: list of dictionaries with 'key':string and (optional) 'value':string pairs
         *
         * Attributes (return-only):
         * @param fee [integer]: fee charged by this Invoice. ex: 65 (= R$ 0.65)
         * @param pdf [string]: public Invoice PDF URL. ex: 'https://invoice.starkbank.com/pdf/d454fa4e524441c1b0c1a729457ed9d8'
         * @param link [string]: public Invoice webpage URL. ex: 'https://my-workspace.sandbox.starkbank.com/invoicelink/d454fa4e524441c1b0c1a729457ed9d8'
         * @param nominalAmount [integer]: Invoice emission value in cents (will change if invoice is updated, but not if it's paid). ex: 400000
         * @param fineAmount [integer]: Invoice fine value calculated over nominalAmount. ex: 20000
         * @param interestAmount [integer]: Invoice interest value calculated over nominalAmount. ex: 10000
         * @param discountAmount [integer]: Invoice discount value calculated over nominalAmount. ex: 3000
         * @param id [string]: unique id returned when Invoice is created. ex: '5656565656565656'
         * @param brcode [string]: BR Code for the Invoice payment. ex: '00020101021226800014br.gov.bcb.pix2558invoice.starkbank.com/f5333103-3279-4db2-8389-5efe335ba93d5204000053039865802BR5913Arya Stark6009Sao Paulo6220051656565656565656566304A9A0'
         * @param status [string]: current Invoice status. ex: 'created', 'paid', 'canceled' or 'overdue'
         * @param transactionIds [list of strings]: ledger transaction ids linked to this Invoice (if there are more than one, all but the first are reversals or failed reversal chargebacks). ex: ['19827356981273']
         * @param created [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
         * @param updated [string]: creation datetime for the Invoice. ex: '2020-03-10 10:30:00.000000+00:00'
         *
         */

        amount: number
        taxId: string
        name: string

        due: string
        expiration: number
        fine: number
        interest: number
        discounts: {
            percentage: number
            due: string
        }[]
        tags: string[]
        descriptions: {
            key: string
            value?: string
        }[]

        readonly fee : number
        readonly pdf : string
        readonly link : string
        readonly nominalAmount : number
        readonly fineAmount : number
        readonly interestAmount : number
        readonly discountAmount : number
        readonly id : string
        readonly brcode : string
        readonly status : string
        readonly transactionIds : string[]
        readonly created : string
        readonly updated : string

        constructor(params: {
            amount: number, taxId: string, name: string, due?: string, expiration?: number, fine?: number, 
            interest?: number, discounts?: {percentage: number, due: string}[], tags?: string[], 
            descriptions?: {key: string, value?: string}[], fee?: number | null, pdf?: string | null, link?: string | null, 
            nominalAmount?: number | null, fineAmount?: number | null, interestAmount?: number | null, 
            discountAmount?: number | null, id?: string, brcode?: string | null, status?: string | null, transactionIds?: string[] | null, created?: string | null, 
            updated?: string | null, 
        })
    }

    export namespace invoice {

        /**
         *
         * Create Invoices
         *
         * @description Send a list of Invoice objects for creation in the Stark Bank API
         *
         * Parameters (required):
         * @param Invoices [list of Invoice objects]: list of Invoice objects to be created in the API
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Invoice objects with updated attributes
         *
         */
        function create(Invoices: Invoice[], params?:{ user?: Project | Organization | null}): Promise<Invoice[]>;

        /**
         *
         * Retrieve a specific Invoice
         *
         * @description Receive a single Invoice object previously created in the Stark Bank API by passing its id
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Invoice object with updated attributes
         *
         */
        function get(id: string, params?:{ user?: Project | Organization | null}): Promise<Invoice>;

        /**
         *
         * Retrieve paged Invoices
         *
         * @description Receive a list of up to 100 Invoice objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         *
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'created', 'paid', 'canceled' or 'overdue'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns list of Invoice objects with updated attributes and cursor to retrieve the next page of Invoice objects
         *
         */
        function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[Invoice[], string | null]>;

        /**
         *
         * Retrieve a specific Invoice payment information
         * 
         * @description Receive the Invoice.Payment sub-resource associated with a paid Invoice.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Invoice.Payment sub-resource
         *
         */
        function payment(id: string, params?:{ user?: Project | Organization | null}): any;

        /**
         *
         * Retrieve a specific Invoice pdf file
         *
         * @description Receive a single Invoice pdf file generated in the Stark Bank API by passing its id.
         *
         * Parameters (required):
         * @param id [string]: object unique id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Invoice pdf file
         *
         */
        function pdf(id: string, params?:{ user?: Project | Organization | null}): Promise<Buffer>;

        /**
         *
         * Retrieve a specific Invoice QRCode png
         *
         * @description Receive a single Invoice QRCode in png format generated in the Stark Bank API by the invoice ID.
         *
         * Parameters (required):
         * @param id [string]: Invoice id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param size [integer, default 7.0]: number of pixels in each 'box' of the QR code. Minimum = 1, maximum = 50. ex: 12
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns Invoice QR Code png blob
         *
         */
        function qrcode(id: string, params?: {size?: number, user?: Project | Organization}): any;

        /**
         *
         * Retrieve Invoices
         *
         * @description Receive a generator of Invoice objects previously created in the Stark Bank API
         *
         * Parameters (optional):
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param status [string, default null]: filter for status of retrieved objects. ex: 'created', 'paid', 'canceled' or 'overdue'
         * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ['tony', 'stark']
         * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns generator of Invoice objects with updated attributes
         *
         */
        function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<Invoice[]>;

        /**
         *
         * Update Invoice entity
         *
         * @description Update Invoice by passing id.
         *
         * Parameters (required):
         * @param id [string]: Invoice id. ex: '5656565656565656'
         *
         * Parameters (optional):
         * @param status [string]: If the Invoice hasn't been paid yet, you may cancel it by passing 'canceled' in the status
         * @param amount [integer]: If the Invoice hasn't been paid yet, you may update its amount by passing the desired amount integer. ex: 100 (R$1,00)
         * @param due [string, default now + 2 days]: Invoice due date in UTC ISO format. ex: '2020-11-25T17:59:26.249976+00:00'
         * @param expiration [integer, default null]: time interval in seconds between due date and expiration date. ex 123456789
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         *
         * Return:
         * @returns target Invoice with updated attributes
         *
         */
        function update(id: string, params?: {
            amount?: number, status?: string, due?: string, expiration?: number, user?: Project | Organization | null
        }): Promise<Invoice>;

        export class Log {
            /**
             *
             * Invoice Log object
             *
             * @description Every time an Invoice entity is updated, a corresponding Invoice Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the Invoice.
             *
             * Attributes:
             * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
             * @param invoice [Invoice]: Invoice entity to which the log refers to.
             * @param errors [list of strings]: list of errors linked to this Invoice event
             * @param type [string]: type of the Invoice event which triggered the log creation. ex: 'registered' or 'paid'
             * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
             *
             */

            readonly id : string
            readonly invoice : Invoice
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, invoice: Invoice, errors: string[], type: string, created: string)
        }

        namespace log {
            /**
             *
             * Retrieve a specific Invoice Log
             *
             * @description Receive a single Invoice Log object previously created by the Stark Bank API by passing its id
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Project object]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns Invoice Log object with updated attributes
             *
             */
            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<invoice.Log>;

            /**
             *
             * Retrieve paged Invoice Logs
             *
             * @description Receive a list of up to 100 Invoice.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             *
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
             * @param invoiceIds [list of strings, default null]: list of Invoice ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of Invoice.Log objects with updated attributes and cursor to retrieve the next page of Invoice.Log objects
             *
             */
            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                paymentIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[invoice.Log[], string | null]>;

            /**
             *
             * Retrieve a specific Invoice.Log pdf file
             *
             * @description Receive a single Invoice.Log pdf file generated in the Stark Bank API by passing its id.
             *
             * Parameters (required):
             * @param id [string]: object unique id. ex: '5656565656565656'
             *
             * Parameters (optional):
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns Invoice.Log pdf file
             *
             */
            function pdf(id: string, params?:{ user?: Project | Organization | null}): Promise<Buffer>;

            /**
             *
             * Retrieve Invoice Logs
             *
             * @description Receive a generator of InvoiceLog objects previously created in the Stark Bank API
             *
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: 'paid' or 'registered'
             * @param invoiceIds [list of strings, default null]: list of Invoice ids to filter logs. ex: ['5656565656565656', '4545454545454545']
             * @param user [Project object, default null]: Project object. Not necessary if starkbank.user was set before function call
             *
             * Return:
             * @returns list of InvoiceLog objects with updated attributes
             *
             */
            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                paymentIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<invoice.Log[]>;
        }
    }
}
