
declare module 'starkbank' {
    export class Project {
        constructor(params:{id: string, privateKey: string, environment: string, name?: string, allowedIps?: string});

        accessId(): void;
    }
}
