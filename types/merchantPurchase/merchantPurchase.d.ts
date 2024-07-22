declare module 'starkbank' {

    export class MerchantPurchase {
        amount : number
        cardExpiration : string
        cardNumber : string
        cardSecurityCode : string
        holderName : string
        fundingType : string 
        readonly holderEmail : string 
        readonly holderPhone : string 
        readonly billingCountryCode : string 
        readonly billingCity : string 
        readonly billingStateCode : string 
        readonly billingStreetLine1 : string 
        readonly billingStreetLine2 : string 
        readonly billingZipCode : string 
        readonly metadata : Record<string, any>

        readonly id : string
        readonly installmentCount : number
        readonly cardEnding : string
        readonly cardId : string
        readonly challengeMode : string 
        readonly challengeUrl : string 
        readonly created : string 
        readonly currencyCode : string 
        readonly endToEndId : string 
        readonly fee : number
        readonly network : string 
        readonly source : string 
        readonly status : string 
        readonly tags : string[] 
        readonly updated : string 

        constructor(params: {
            amount: number, cardExpiration: string, cardNumber: string, cardSecurityCode: string, holderName: string, holderEmail: string | null,
            fundingType: string, holderPhone: string | null, billingCountryCode: string | null, billingCity: string | null, billingStateCode: string | null,
            billingStreetLine1: string | null, billingStreetLine2 : string | null, billingZipCode: string | null, metadata: { 
                key: string 
                value?: string} | null, id : string | null,
            installmentCount?: number | null, cardEnding?: string | null, cardId?: string | null, challengeMode?: string | null, challengeUrl?: string | null,
            created?: string | null, currencyCode?: string | null, endToEndId?: string | null, fee?: number | null, network?: string | null, source?: string | null,
            status?: string | null, tags?: string[] | null, updated?: string | null
        })
    }

    export namespace merchantPurchase {

        function get(id: string, params?:{ user?: Project | Organization | null}): Promise<MerchantPurchase>;

        function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[MerchantPurchase[], string | null]>;

        function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<MerchantPurchase[]>;

        export class Log {
            readonly id : string
            readonly purchase : MerchantPurchase
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, purchase: Invoice, errors: string[], type: string, created: string)
        }

        namespace log {

            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<merchantPurchase.Log>;

            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[merchantPurchase.Log[], string | null]>;

            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<merchantPurchase.Log[]>;
        }
    }

}