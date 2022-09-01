
declare module 'starkbank' {

    export class Organization {
        /**
         * 
         * Organization object
         * 
        * @description The Organization object is an authentication entity for the SDK that
        * represents your entire Organization, being able to access any Workspace
        * underneath it and even create new Workspaces. Only a legal representative
        * of your organization can register or change the Organization credentials.
        * All requests to the Stark Bank API must be authenticated via an SDK user,
        * which must have been previously created at the Stark Bank website
        * [https://web.sandbox.starkbank.com] or [https://web.starkbank.com]
        * before you can use it in this SDK. Organizations may be passed as the user parameter on
        * each request or may be defined as the default user at the start (See README).
        * If you are accessing a specific Workspace using Organization credentials, you should
        * specify the workspace ID when building the Organization object or by request, using
        * the organization.withWorkspace(workspaceId) method, which creates a copy of the organization
        * object with the altered workspace ID. If you are listing or creating new Workspaces, the
        * workspaceId should be null.
        * 
        * Parameters (required):
        * @param id [string]: unique id required to identify organization. ex: '5656565656565656'
        * @param privateKey [string]: PEM string of the private key linked to the organization. ex: '-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEyTIHK6jYuik6ktM9FIF3yCEYzpLjO5X/\ntqDioGM+R2RyW0QEo+1DG8BrUf4UXHSvCjtQ0yLppygz23z0yPZYfw==\n-----END PUBLIC KEY-----'
        * @param environment [string]: environment where the organization is being used. ex: 'sandbox' or 'production'
        * @param workspaceId [string]: unique id of the accessed Workspace, if any. ex: null or '4848484848484848'
        * 
        * Attributes (return-only):
        * @param pem [string]: private key in pem format. ex: '-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEyTIHK6jYuik6ktM9FIF3yCEYzpLjO5X/\ntqDioGM+R2RyW0QEo+1DG8BrUf4UXHSvCjtQ0yLppygz23z0yPZYfw==\n-----END PUBLIC KEY-----'
        * 
        */

        id: string;
        privateKey: string;
        environment: string;
        workspaceId: string;
        readonly pem: string;

        constructor(params?: {id: string, privateKey: string, environment: string, workspaceId?: string});

        accessId(): void;
    }

    export namespace organization {
        function replace(organization: Organization, workspaceId: string | null): Organization;
    }
}
