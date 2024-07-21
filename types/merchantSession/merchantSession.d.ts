declare module 'starkbank' {

    export class MerchantSession {
        allowedFundingTypes: {
            key: number,
            value?: number
        }
        allowedInstallments: {
            key: number,
            value?: number
        }
        expiration: number

        readonly id : string
        readonly allowedIps: string
        readonly challengeMode: string
        readonly created: string
        readonly status: string
        readonly tags: string[]
        readonly updated: string
        readonly uuid: string

        constructor(params: {allowedFundingTypes: {
            key: number,
            value?: number
        }, allowedInstallments: {
            key: number,
            value?: number
        }, id : string, expiration: number, allowedIps: string, challengeMode: string, created: string, status: string, tags: string[], updated: string, uuid: string})
    }

    export namespace merchantSession {

        function create(params?: {allowedFundingTypes: {
            key: number,
            value?: number
        }, allowedInstallments: {
            key: number,
            value?: number
        }, expiration: number, challengeMode: string | null, allowedIps: string | null, tags: string[] | null}): Promise<MerchantSession>;

        function purchase(params?: {amount: number, cardExpiration: string, cardNumber: string, cardSecurityCode: string, holderName: string, holderEmail: string,
            fundingType: string, holderPhone: string | null, billingCountryCode: string | null, billingCity: string | null, billingStateCode: string | null,
            billingStreetLine1: string | null, billingStreetLine2: string | null, billingZipCode: string | null, metadata: { 
                key: string 
                value?: string} | null, user?: Project | Organization | null}): any;

        function get(id: string, params?:{ user?: Project | Organization | null}): Promise<MerchantSession>;

        function page(params?: { 
            cursor?: string | null, 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<[MerchantSession[], string | null]>;

        function query(params?: { 
            limit?: number | null, 
            after?: string | null, 
            before?: string | null, 
            status?: string | null, 
            tags?: string[] | null, 
            ids?: string[] | null, 
            user?: Project | Organization | null
        }): Promise<MerchantSession[]>;

        export class Log {
            readonly id : string
            readonly purchase : MerchantSession
            readonly errors: string[]
            readonly type : string
            readonly created : string

            constructor(id: string, purchase: Invoice, errors: string[], type: string, created: string)
        }

        namespace log {

            function get(id: string, params?:{ user?: Project | Organization | null}): Promise<merchantSession.Log>;

            function page(params?: { 
                cursor?: string | null, 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<[merchantSession.Log[], string | null]>;

            function query(params?: { 
                limit?: number | null, 
                after?: string | null, 
                before?: string | null, 
                types?: string[] | null, 
                user?: Project | Organization | null
            }): Promise<merchantSession.Log[]>;
        }
    }

}