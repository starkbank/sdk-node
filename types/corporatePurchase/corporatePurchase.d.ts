declare module 'starkbank' {

    export class corporatePurchse {
        /**
         * 
         * CorporatePurchase object
         * 
         * @description Displays the CorporatePurchase objects created in your Workspace.
         *
         * Attributes (return-only):
         * @param id [string]: unique id returned when CorporatePurchase is created. ex: "5656565656565656"
         * @param holderId [string]: card holder unique id. ex: "5656565656565656"
         * @param holderName [string]: card holder name. ex: "Tony Stark"
         * @param centerId [string]: target cost center ID. ex: "5656565656565656"
         * @param cardId [string]: unique id returned when CorporateCard is created. ex: "5656565656565656"
         * @param cardEnding [string]: last 4 digits of the card number. ex: "1234"
         * @param description [string]: purchase descriptions. ex: "myDescription"
         * @param amount [integer]: CorporatePurchase value in cents. Minimum = 0. ex: 1234 (= R$ 12.34)
         * @param tax [integer]: IOF amount taxed for international purchases. ex: 1234 (= R$ 12.34)
         * @param issuerAmount [integer]: issuer amount. ex: 1234 (= R$ 12.34)
         * @param issuerCurrencyCode [string]: issuer currency code. ex: "USD"
         * @param issuerCurrencySymbol [string]: issuer currency symbol. ex: "$"
         * @param merchantAmount [integer]: merchant amount. ex: 1234 (= R$ 12.34)
         * @param merchantCurrencyCode [string]: merchant currency code. ex: "USD"
         * @param merchantCurrencySymbol [string]: merchant currency symbol. ex: "$"
         * @param merchantCategoryCode [string]: merchant category code. ex: "fastFoodRestaurants"
         * @param merchantCategoryType [string]: merchant category type. ex: "health"
         * @param merchantCountryCode [string]: merchant country code. ex: "USA"
         * @param merchantName [string]: merchant name. ex: "Google Cloud Platform"
         * @param merchantDisplayName [string]: merchant name. ex: "Google Cloud Platform"
         * @param merchantDisplayUrl [string]: public merchant icon (png image). ex: "https://sandbox.api.starkbank.com/v2/corporate-icon/merchant/ifood.png"
         * @param merchantFee [integer]: fee charged by the merchant to cover specific costs, such as ATM withdrawal logistics, etc. ex: 200 (= R$ 2.00)
         * @param methodCode [string]: method code. Options: "chip", "token", "server", "manual", "magstripe" or "contactless"
         * @param tags [list of strings]: list of strings for tagging returned by the sub-issuer during the authorization. ex: ["travel", "food"]
         * @param corporateTransactionIds [list of strings]: ledger transaction ids linked to this Purchase
         * @param status [string]: current CorporateCard status. Options: "approved", "canceled", "denied", "confirmed", "voided"
         * @param updated [string] latest update datetime for the CorporateCard. ex: '2020-03-10 10:30:00.000'
         * @param created [string] creation datetime for the CorporateCard. ex: '2020-03-10 10:30:00.000'
         */ 

        readonly id : string
        readonly holderId : string
        readonly holderName : string
        readonly centerId : string
        readonly cardId : string
        readonly cardEnding : string
        readonly description : string
        readonly amount : number
        readonly tax : number
        readonly issuerAmount : number
        readonly issuerCurrencyCode : number
        readonly issuerCurrencySymbol : number
        readonly merchantAmount : number
        readonly merchantCurrencyCode : string
        readonly merchantCurrencySymbol : string
        readonly merchantCategoryCode : string
        readonly merchantCategoryType : string
        readonly merchantCountryCode : string
        readonly merchantName : string
        readonly merchantDisplayName : string
        readonly merchantDisplayUrl : string
        readonly merchantFee : number
        readonly methodCode : string
        readonly tags : string[]
        readonly corporateTransactionIds : string[]
        readonly status : string
        readonly updated : string
        readonly created  : string

        constructor(params: {
            id?: string | null,
            holderId?: string | null,  
            holderName?: string | null,  
            centerId?: string | null,  
            cardId?: string | null,  
            cardEnding?: string | null,  
            description?: string | null, 
            amount?: number | null,  
            tax?: number | null, 
            issuerAmount?: number | null,  
            issuerCurrencyCode?: number | null, 
            issuerCurrencySymbol?: number | null,  
            merchantAmount?: number | null, 
            merchantCurrencyCode?: string | null,  
            merchantCurrencySymbol?: string | null,  
            merchantCategoryCode?: string | null,  
            merchantCategoryType?: string | null,  
            merchantCountryCode?: string | null,  
            merchantName?: string | null,  
            merchantDisplayName?: string | null,  
            merchantDisplayUrl?: string | null,  
            merchantFee?: number | null,  
            methodCode?: string | null,  
            tags?: string[] | null,  
            corporateTransactionIds?: string[] | null,  
            status?: string | null,  
            updated?: string | null,  
            created?: string | null
        })
    }

    export namespace corporatePurchase {
        /**
         * 
         * Retrieve a specific CorporatePurchase
         * 
         * @description Receive a single CorporatePurchase object previously created in the Stark Bank API by its id
         * 
         * Parameters (required):
         * @param id [string]: object unique id. ex: "5656565656565656"
         * 
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return CorporatePurchase object with updated attributes
         * 
         */

        function get(id: string, params?: { user?: Project | Organization | null }): Promise<CorporatePurchse>

        /**
         * Retrieve CorporatePurchases
         *
         * @description Receive a generator of CorporatePurchase objects previously created in the Stark Bank API
         * 
         * Parameters (optional):
         * @param ids [list of strings, default null]: purchase IDs
         * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param merchantCategoryTypes [list of strings, default null]: merchant category type. ex: "health"
         * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
         * @param cardIds [list of strings, default null]: card  IDs. ex: ["5656565656565656", "4545454545454545"]
         * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["approved", "canceled", "denied", "confirmed", "voided"],
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return generator of CorporatePurchase objects with updated attributes
         */

        function query(params?: {
            ids?: string[] | null,
            limit?: number | null, 
            after?: string | null, 
            before?: string | null,
            merchantCategoryTypes?: string | null,
            holderIds?: string[] | null,
            cardIds?: string[] | null,
            status?: string[] | null,
            user?: Project | Organization | null 
        }): Promise<CorporatePurchase[]>

        /**
         * 
         * Retrieve paged CorporatePurchase
         * 
         * @description Receive a list of up to 100 CorporatePurchase objects previously created in the Stark Bank API and the cursor to the next page.
         * Use this function instead of query if you want to manually page your requests.
         * 
         * Parameters (optional):
         * @param cursor [string, default null]: cursor returned on the previous page function call
         * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
         * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
         * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
         * @param merchantCategoryTypes [list of strings, default null]: merchant category type. ex: "health"
         * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
         * @param cardIds [list of strings, default null]: card  IDs. ex: ["5656565656565656", "4545454545454545"]
         * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["approved", "canceled", "denied", "confirmed", "voided"]
         * @param ids [list of strings, default null]: purchase IDs
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return list of CorporatePurchase objects with updated attributes
         * @return cursor to retrieve the next page of CorporatePurchase objects
         * 
         */

        function page(params?: {
            cursor?: string  | null,
            ids?: string[] | null,
            limit?: number | null, 
            after?: string | null, 
            before?: string | null,
            merchantCategoryTypes?: string | null,
            holderIds?: string[] | null,
            cardIds?: string[] | null,
            status?: string[] | null,
            user?: Project | Organization | null 
        }): Promise<[CorporatePurchse[], string | null]>;

        /**
         * 
         * @description Create a single verified CorporatePurchase authorization request from a content string
         * Use this method to parse and verify the authenticity of the authorization request received at the informed endpoint.
         * Authorization requests are posted to your registered endpoint whenever CorporatePurchases are received.
         * They present CorporatePurchase data that must be analyzed and answered with approval or declination.
         * If the provided digital signature does not check out with the starkbank public key, a stark.exception.InvalidSignatureException will be raised.
         * If the authorization request is not answered within 2 seconds or is not answered with an HTTP status code 200 the CorporatePurchase will go through the pre-configured stand-in validation.
         * 
         * Parameters (required):
         * @param content [string]: response content from request received at user endpoint (not parsed)
         * @param signature [string]: base-64 digital signature received at response header "Digital-Signature"
         * 
         * Parameters (optional):
         * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
         * 
         * Return:
         * @return Parsed CorporatePurchase object
         * 
         */

        export function parse(params?: {
            content: string, signature: string, 
            user?: Project | Organization
        }): Promise<CorporatePurchase>;

        /**
         * 
         * Helps you respond CorporatePurchase requests
         * 
         * Parameters (required):
         * @param status [string]: sub-issuer response to the authorization. ex: "approved" or "denied"
         * 
         * Parameters (conditionally required):
         * @param reason [string]: denial reason. Options: "other", "blocked", "lostCard", "stolenCard", "invalidPin", "invalidCard", "cardExpired", "issuerError", "concurrency", "standInDenial", "subIssuerError", "invalidPurpose", "invalidZipCode", "invalidWalletId", "inconsistentCard", "settlementFailed", "cardRuleMismatch", "invalidExpiration", "prepaidInstallment", "holderRuleMismatch", "insufficientBalance", "tooManyTransactions", "invalidSecurityCode", "invalidPaymentMethod", "confirmationDeadline", "withdrawalAmountLimit", "insufficientCardLimit", "insufficientHolderLimit"
         * 
         * Parameters (optional):
         * @param amount [integer, default null]: amount in cents that was authorized. ex: 1234 (= R$ 12.34)
         * @param tags [list of strings, default null]: tags to filter retrieved object. ex: ["tony", "stark"]
         * 
         * Return:
         * @return Dumped JSON string that must be returned to us on the CorporatePurchase request
         * 
         */

        function response(status: string, params?: {
            amount: string | null, reason: string | null,
            tags: string[] | null
        }): Promise<CorporatePurchse>

        export class Log {
            /**
             * 
             * corporatepurchase.Log object
             * 
             * @description Every time a CorporatePurchase entity is updated, a corresponding corporatepurchase.Log
             * is generated for the entity. This log is never generated by the
             * user, but it can be retrieved to check additional information
             * on the CorporatePurchase.
             * 
             * Attributes (return-only):
             * @return id [string]: unique id returned when the log is created. ex: "5656565656565656"
             * @return purchase [CorporatePurchase]: CorporatePurchase entity to which the log refers to.
             * @return description [string]: purchase descriptions. ex: "my_description"
             * @return corporateTransactionId [string]: transaction ID related to the CorporateCard.
             * @return errors [list of StarkCore.Error]: list of errors linked to this CorporatePurchase event.
             * @return type [string]: type of the CorporatePurchase event which triggered the log creation. ex: "approved", "canceled", "confirmed", "denied", "reversed", "voided"
             * @return created [string] latest update datetime for the CorporatePurchase. ex: '2020-03-10 10:30:00.000'
             * 
             */

            readonly id : string
            readonly purchase : CorporateCard
            readonly description : string
            readonly corporateTransactionId : string
            readonly errors : Starkcore.Error[]
            readonly type : string
            readonly created : string

            constructor(params: {
                id?: string | null,
                purchase?: CorporateCard | null,
                description?: string | null, 
                corporateTransactionId?: string | null,
                errors?: Starkcore.Error[] | null, 
                type?: string | null, 
                created?: string | null
            })
        }

        export namespace log {
            /**
             * 
             * Retrieve a specific corporatepurchase.Log
             * 
             * @description Receive a single corporatepurchase.Log object previously created by the Stark Bank API by its id
             * 
             * Parameters (required):
             * @param id [string]: object unique id. ex: "5656565656565656"
             * 
             * Parameters (optional):
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @return corporatepurchase.Log object with updated attributes
             * 
             */

            function get(id: string, params?: {user?: Project | Organization | null}): Promise<Log>

            /**
             * 
             * Retrieve corporatepurchase.Log
             * 
             * @description Receive a generator of corporatepurchase.Log objects previously created in the Stark Bank API
             * 
             * Parameters (optional):
             * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: ["approved", "canceled", "confirmed", "denied", "reversed", "voided"]
             * @param purchaseIds [list of strings, default null]: list of Purchase ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param ids [list of strings, default null]: list of CorporatePurchase ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @return generator of corporatepurchase.Log objects with updated attributes
             * 
             */

            function query(params?: {
                limit?: number | null, after?: string | null, 
                before?: string | null, types?: string[] | null, 
                purchaseIds?: string[] | null, ids?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<Log[]>

            /**
             * 
             * Retrieve paged corporatepurchase.Log
             * 
             * @description Receive a list of up to 100 corporatepurchase.Log objects previously created in the Stark Bank API and the cursor to the next page.
             * Use this function instead of query if you want to manually page your requests.
             * 
             * Parameters (optional):
             * @param cursor [string, default null]: cursor returned on the previous page function call
             * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
             * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
             * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
             * @param types [list of strings, default null]: filter for log event types. ex: ["approved", "canceled", "confirmed", "denied", "reversed", "voided"]
             * @param purchaseIds [list of strings, default null]: list of Purchase ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param ids [list of strings, default null]: list of CorporatePurchase ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
             * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call
             * 
             * Return:
             * @return list of corporatepurchase.Log objects with updated attributes
             * @return cursor to retrieve the next page of corporatepurchase.Log objects
             * 
             */
            function page(params?: {
                cursor?: string | null, limit?: number | null,
                after?: string | null, before?: string | null, 
                types?: string[] | null, purchaseIds?: string[] | null, 
                ids?: string[] | null, user?: Project | Organization | null
            }): Promisse<Log[], string | null>
        }
    }
}

