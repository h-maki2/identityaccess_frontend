export class IdentityAccessGetRequest
{
    protected requestUrl: string;
    protected readonly BASE_URL = 'https://api.identityaccess.com/';

    constructor(requestUrlPath: string)
    {
        this.requestUrl = `${this.BASE_URL}${requestUrlPath}`;
    }
}