declare module 'starkbank' {
    export class MerchantCard {
        public ending: string;
        public expiration: string;
        public holderName: string;
        public fundingType: string;
        public network: string;
        public status: string;
        public tags: string[];
        public created: string;
        public updated: string;
        public id: string;

        constructor(params: {ending: string, expiration: string, holderName: string,
        fundingType: string, network: string, status: string, tags: string[], created: string, updated: string})
    }

    export namespace merchantCard {
        function get(id: string): Promise<MerchantCard>;

        function query(params?: {
            limit?: number | null,
            after?: string | null,
            before?: string | null,
            status?: string | null,
            tags?: string[] | null 
        }): Promise<MerchantCard[]>;

        function page(params?: {
            cursor?: string | null,
            limit?: number | null,
            after?: string | null,
            before?: string | null, 
            status?: string | null, 
            tags?: string | null[],
        }): Promise<[MerchantCard[], string | null]>;

        export class Log {
            public id: string;
            public card: MerchantCard;
            public created: string;
            public type: string;
            public errors: string[];

            constructor(params: { id: string, card: MerchantCard, created: string, type: string, errors: string[] });
        }
        
        namespace log {
            function get(id: string): Promise<merchantCard.Log>;

            function query(params?: {
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[ | null]
            }): Promise<merchantCard.Log[]>;

            function page(params?: {
                cursor?: string | null,
                limit?: number | null,
                after?: string | null,
                before?: string | null,
                types?: string[ | null]
            }): Promise<[merchantCard.Log[], string | null]>;
        }
    }
}