export class IdentityAccessGetRequest
{
    protected requestUrl: string;
    protected readonly BASE_URL = 'https://identityaccessapi.com/';

    constructor(requestUrlPath: string)
    {
        this.requestUrl = `${this.BASE_URL}${requestUrlPath}`;
    }
}