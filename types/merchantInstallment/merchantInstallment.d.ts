declare module 'starkbank' {
    export class MerchantInstallment {
        readonly amount: number;
        readonly fee: number;
        readonly fundingType: string;
        readonly network: string;
        readonly purchaseId: string;
        readonly status: string;
        readonly transactionIds: string[];
        readonly tags: string[];
        readonly due: Date;
        readonly created: Date;
        readonly updated: Date;
        readonly id: string;

        constructor(params: {
            amount: number, fee: number, fundingType: string, network: string, purchaseId: string, status: string,
            transactionIds: string[], tags: string[], due: Date, created: Date, updated: Date, id: string
        });
    }

    export namespace merchantInstallment {

        function get(id: string, params?: { user?: Project | Organization | null }): Promise<MerchantInstallment>;

        function query(params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string | null,
            tags?: string[] | null,
            user?: Project | Organization | null
        }): Promise<MerchantInstallment[]>;

        function page(params?: {
            cursor?: string | null,
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string | null,
            tags?: string[] | null,
            purchaseId?: string | null,
            network?: string | null,
            fundingType?: string | null,
            user?: Project | Organization | null
        }): Promise<[MerchantInstallment[], string | null]>;

        export class Log {
            readonly id: string;
            readonly installment: MerchantInstallment;
            readonly errors: string[];
            readonly type: string;
            readonly created: Date;

            constructor(params: { id: string, installment: MerchantInstallment, errors: string[], type: string, created: Date });
        }

        namespace log {
                
            function get(id: string, params?: { user?: Project | Organization | null }): Promise<merchantInstallment.Log>;

            function page(params?: {
                cursor?: string | null,
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                user?: Project | Organization | null
            }): Promise<[merchantInstallment.Log[], string | null]>;

            function query(params?: {
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[] | null,
                user?: Project | Organization | null
            }): Promise<merchantInstallment.Log[]>;
        }
    }
}