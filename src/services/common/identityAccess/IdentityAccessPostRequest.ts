import { IdentityAccessApiResponse } from "./IdentityAccessApiResponse";
import { IdentityAccessApiVersion } from "./IdentityAccessApiVersion";

export class IdentityAccessPostRequest
{
    protected requestUrl: string;
    protected readonly BASE_URL = 'https://identityaccessapi.com/';

    constructor(requestUrlPath: string)
    {
        this.requestUrl = `${this.BASE_URL}${requestUrlPath}`;
    }

    public async send<
        TRequestData, 
        TResponseData, 
        TErrorDetails
    >(
        requestData: TRequestData,
        identityAccessApiVersion: IdentityAccessApiVersion
    ): Promise<IdentityAccessApiResponse<TResponseData, TErrorDetails>>
    {
        const response = await fetch(this.requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": `application/vnd.example.${identityAccessApiVersion}+json`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseJson: IdentityAccessApiResponse<TResponseData, TErrorDetails> = await response.json();

        return responseJson;
    }
}