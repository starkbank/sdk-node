
declare module 'starkbank' {
    export class Project {

        id: string
        privateKey: string
        environment: string
        name?: string
        allowedIps?: string

        constructor(params:{id: string, privateKey: string, environment: string, name?: string, allowedIps?: string});

        accessId(): void;
    }
}
