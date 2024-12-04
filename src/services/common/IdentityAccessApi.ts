import { HttpMethod } from "./HttpMethod";

abstract class IdentityAccessApi
{
    protected httpMethod: HttpMethod;
    protected requestUrl: string;
    protected readonly BASE_URL = 'https://identityaccessapi.com/';

    constructor(requestUrlPath: string, httpMethod: HttpMethod)
    {
        this.httpMethod = httpMethod;
        this.requestUrl = `${this.BASE_URL}${requestUrlPath}`;
    }
}