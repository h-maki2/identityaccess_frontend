import { HttpMethod } from "./HttpMethod";
import { IdentityAccessApiResult } from "./IdentityAccessApiResult";

class IdentityAccessPostApi
{
    protected requestUrl: string;
    protected readonly BASE_URL = 'https://identityaccessapi.com/';

    constructor(requestUrlPath: string)
    {
        this.requestUrl = `${this.BASE_URL}${requestUrlPath}`;
    }

    public async sendRequest<T>(requestData: T): Promise<IdentityAccessApiResult>
    {
        const response = await fetch(this.requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responsejson = await response.json();

        return new IdentityAccessApiResult(responsejson.status, responsejson.message, responsejson.data);
    }
}