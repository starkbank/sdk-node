declare module 'starkbank' {
    export class CorporateCard {
        /**
        *  
        * CorporateCard object
        * 
        * @description The CorporateCard object displays the information of the cards created in your Workspace.
        * Sensitive information will only be returned when the "expand" parameter is used, to avoid security concerns.
        * When you initialize a CorporateCard, the entity will not be automatically
        * created in the Stark Bank API. The 'create' function sends the objects
        * to the Stark Bank API and returns the created object.
        * 
        * Parameters (required):
        * @param holderId [string]: card holder unique id. ex: "5656565656565656"
        * 
        * Attributes (return-only):
        * @param id [string]: unique id returned when CorporateCard is created. ex: "5656565656565656"
        * @param holderName [string]: card holder name. ex: "Tony Stark"
        * @param displayName [string]: card displayed name. ex: "ANTHONY STARK"
        * @param rules [list of CorporateRule objects]: [EXPANDABLE] list of card spending rules.
        * @param tags [list of strings]: list of strings for tagging. ex: ["travel", "food"]
        * @param streetLine1 [string, default sub-issuer street line 1]: card holder main address. ex: "Av. Paulista, 200"
        * @param streetLine2 [string, default sub-issuer street line 2]: card holder address complement. ex: "Apto. 123"
        * @param district [string, default sub-issuer district]: card holder address district/neighbourhood. ex: "Bela Vista"
        * @param city [string, default sub-issuer city]: card holder address city. ex: "Rio de Janeiro"
        * @param stateCode [string, default sub-issuer state code]: card holder address state. ex: "GO"
        * @param zipCode [string, default sub-issuer zip code]: card holder address zip code. ex: "01311-200"
        * @param type [string]: card type. ex: "virtual"
        * @param status [string]: current CorporateCard status. ex: "active", "blocked", "canceled", "expired"
        * @param number [string]: [EXPANDABLE] masked card number. Expand to unmask the value. ex: "123"
        * @param securityCode [string]: [EXPANDABLE] masked card verification value (cvv). Expand to unmask the value. ex: "123"
        * @param expiration [string]: masked card expiration datetime. Expand to unmask the value. ex: '2020-03-10 10:30:00.000'
        * @param updated [string]: latest update datetime for the CorporateCard. ex: '2020-03-10 10:30:00.000'
        * @param created [string]: creation datetime for the CorportaCard. ex: '2020-03-10 10:30:00.000'
        */

        holderId: string

        readonly id : string
        readonly holderName : string
        readonly displayName : string
        readonly rules : invoice.Rule[]
        readonly tags : string[]
        readonly streetLine1 : string
        readonly streetLine2 : string
        readonly district : string
        readonly city : string
        readonly stateCode : string 
        readonly zipCode : string 
        readonly type : string 
        readonly status : string 
        readonly number : string 
        readonly securityCode : string 
        readonly expiration : string 
        readonly updated : string 
        readonly created : string 

        constructor(params?: {
            holderId: string, id? : string | null, holderName? : string | null, displayName? : string | null, rules? : invoice.Rule[] | null,
            tags? : string[] | null, streetLine1? : string | null, streetLine2? : string | null, district? : string | null, city? : string | null,
            stateCode? : string | null, zipCode? : string | null, type? : string | null, status? : string | null, number? : string | null, securityCode? : string | null,
            expiration? : string | null, updated? : string | null, created?: string | null
        })
    }

    export namespace corporateCard {
        /**
        * 
        * Create CorporateCard
        * 
        * @description Send a CorporateCard object for creation at the Stark Bank API
        * If the CorporateCard was not used in the last purchase, this resource will return it.
        * 
        * Parameters (required):
        * @param card [CorporateCard object]: CorporateCard object to be created in the API.
        * 
        * Parameters (optional):
        * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        *
        *  Return:
        * @return CorporateCard object with updated attributes
        * 
        */

        function create(card: CorporateCard, params?:{ user?: Project | Organization | null, expand?: string[]}): Promise<CorporateCard>;

        /**
        * 
        * Retrieve CorporateCards
        * 
        * @description Receive a generator of CorporateCard objects previously created in the Stark Bank API
        * 
        * Parameters (optional):
        * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
        * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
        * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
        * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled", "expired"]
        * @param types [list of strings, default null]: card type. ex: ["virtual"]
        * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
        * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
        * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
        * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        * 
        * Return:
        * @return generator of CorporateCard objects with updated attributes
        * 
        */

        function page(params?: {  
            cursor?: string | null,
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null,
            types?: string[] | null,
            holderIds?: string[] | null,
            ids?: string[] | null,
            tags?: string[] | null,
            expand?: string[] | null,
            user?: Project | Organization | null
        }): Promise<[CorporateCard[], string | null]>;

        /**
        * 
        * Retrieve CorporateCards
        * 
        * @description Receive a generator of CorporateCard objects previously created in the Stark Bank API
        * 
        * Parameters (optional):
        * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
        * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
        * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
        * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled", "expired"]
        * @param types [list of strings, default null]: card type. ex: ["virtual"]
        * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
        * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
        * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
        * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        * 
        * Return:
        * @return generator of CorporateCard objects with updated attributes
        * 
        */

        export function query(params?: { 
            limit?: number | null,
            after?: string | null, 
            before?: string | null, 
            status?: string | null,
            types?: string[] | null,
            holderIds?: string[] | null,
            ids?: string[] | null,
            tags?: string[] | null,
            expand?: string[] | null,
            user?: Project | Organization | null
            user?: Project | Organization | null
        }): Promise<CorporateCard[]>;

        /**
        * 
        * Retrieve a specific CorporateCard
        * 
        * @description Receive a single CorporateCard object previously created in the Stark Bank API by its id
        * 
        * Parameters (required):
        * @param id [string]: object unique id. ex: "5656565656565656"
        * 
        * Parameters (optional):
        * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        * 
        * Return:
        * @return CorporateCard object with updated attributes
        * 
        */

        function get(id: string, params?:{ user?: Project | Organization | null}): Promise<CorporateCard>;

        /**
        * 
        * Update a CorporateCard entity
        * 
        * @description Update a CorporateCard by passing id.
        * 
        * Parameters (required):
        * @param id [string]: CorporateCard id. ex: '5656565656565656'
        * 
        * Parameters (optional):
        * @param status [string, default null]: You may block the CorporateCard by passing 'blocked' or activate by passing 'active' in the status
        * @param displayName [string, default null]: card displayed name. ex: "ANTHONY EDWARD"
        * @param pin [string, default null]: You may unlock your physical card by passing its PIN. This is also the PIN you use to authorize a purhcase.
        * @param rules [list of CorporateRule objects, default null]: list of dictionaries with "amount": int, "currencyCode": string, "id": string, "interval": string, "name": string pairs.
        * @param tags [list of strings]: list of strings for tagging. ex: ["tony", "stark"]
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        *
        * Return:
        * @return target CorporateCard with updated attributes
        * 
        */

        function update(id: string, params?: {
            displayName?: string | null, status?: string | null, pin?: string | null, rules?: CorporateRule[] | null, tags?: string[] | null, user?: Project | Organization | null
        }): Promise<CorporateCard>;


        /**
        * 
        * Cancel a CorporateCard entity
        * 
        * @descrption Cancel a CorporateCard entity previously created in the Stark Bank API
        * 
        * Parameters (required):
        * @param id [string]: CorporateCard unique id. ex: "5656565656565656"
        * 
        * Parameters (optional):
        * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
        * Return:
        * @return canceled CorporateCard object
        * 
        */

        function cancel(id: string, params?: {user?: Project | Organization | null})


            export class Rule {
            /**
            * Invoice.Rule object
            * 
            * @description The Invoice.Rule object modifies the behavior of Invoice objects when passed as an argument upon their creation.
            * 
            * Parameters (required):
            * @param key [string]: Rule to be customized, describes what Invoice behavior will be altered. ex: "allowedTaxIds"
            * @param value [list of string]: Value of the rule. ex: ["012.345.678-90", "45.059.493/0001-73"]
            * 
            */
            key: string
            value: string[]

            constructor(params: {
                key: string,
                value: string[]
            })
        }

        export class Log {
            /**
            * 
            * corporatecard.Log object
            *
            * @description Every time a CorporateCard entity is updated, a corresponding corporatecard.Log
            * is generated for the entity. This log is never generated by the user,
            * but it can be retrieved to check additional information on the CorporateCard.
            * 
            * Attributes (return-only):
            * @param id [string]: Unique id returned when the log is created. ex: "5656565656565656"
            * @param card [CorporateCard]: CorporateCard entity to which the log refers to.
            * @param type [string]: Type of the CorporateCard event which triggered the log creation. ex: "blocked", "canceled", "created", "expired", "unblocked", "updated"
            * @param created [string] creation datetime for the balance. ex: '2020-03-10 10:30:00.000'
            */

            readonly id : string
            readonly card : corporateCard
            readonly type : string
            readonly created : string

            constructor(params?: {id?: string | null, card?: corporateCard | null, type?: string | null, created?: string | null})
        }

        export namespace log {
            /**
            * 
            * Retrieve a specific corporatecard.Log
            * 
            * @description Receive a single corporatecard.Log object previously created by the Stark Bank API by its id
            * 
            * Parameters (required):
            * @param id [string]: Object unique id. ex: "5656565656565656"
            * 
            * Parameters (optional):
            * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
            * 
            * @return corporatecard.Log object with updated attributes
            * 
            */

            function get(id: string, params?: { user?: Project | Organization | null}): Promise<CorporateCard.Log>;

            /**
            * 
            * Retrieve corporatecard.Log
            * 
            * @description Receive a generator of corporatecard.Log objects previously created in the Stark Bank API
            * 
            * Parameters (optional):
            * @param limit [integer, default null]: Maximum number of objects to be retrieved. Unlimited if null. ex: 35
            * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
            * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
            * @param types [list of strings, default null]: Filter for log event types. ex: ["blocked", "canceled", "created", "expired", "unblocked", "updated"]
            * @param cardIds [list of strings, default null]: List of CorporateCard ids to filter logs. ex: ["5656565656565656", "4545454545454545"]
            * @param ids [list of strings, default null]: List of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
            * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
            * 
            * @return Generator of corporatecard.Log objects with updated attributes
            * 
            */

            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null,
                ids?: string[] | null,
                cardIds?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<CorporateCard.Log[]>;

            /**
            * 
            * Retrieve paged CorporateCards
            * 
            * @description Receive a list of up to 100 CorporateCard objects previously created in the Stark Bank API and the cursor to the next page.
            * Use this function instead of query if you want to manually page your requests.
            * Parameters (optional):
            * 
            * @param cursor [string, default null]: cursor returned on the previous page function call
            * @param limit [integer, default 100]: maximum number of objects to be retrieved. Max = 100. ex: 35
            * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
            * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
            * @param status [list of strings, default null]: filter for status of retrieved objects. ex: ["active", "blocked", "canceled", "expired"]
            * @param types [list of strings, default null]: card type. ex: ["virtual"]
            * @param holderIds [list of strings, default null]: card holder IDs. ex: ["5656565656565656", "4545454545454545"]
            * @param ids [list of strings, default null]: list of ids to filter retrieved objects. ex: ["5656565656565656", "4545454545454545"]
            * @param tags [list of strings, default null]: tags to filter retrieved objects. ex: ["tony", "stark"]
            * @param expand [list of strings, default null]: fields to expand information. ex: ["rules", "securityCode", "number", "expiration"]
            * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkbank.user was set before function call.
            *
            * Return:
            * @return list of CorporateCard objects with updated attributes
            * @return cursor to retrieve the next page of CorporateCard objects
            * 
            */

            export function page(params?: { 
                cursor?: string  | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null,
                holderIds?: string[] | null,
                ids?: string[] | null,
                tags?: string[] | null,
                expand?: string[] | null,
                user?: Project | Organization | null
            }): Promise<[CorporateCard.Log[], string | null]>;
        }
    }
}
