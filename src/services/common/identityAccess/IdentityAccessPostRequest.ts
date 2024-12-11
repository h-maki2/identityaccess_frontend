import { FetchCsrfToken } from "../csrfToken/FetchCsrfToken";
import { IdentityAccessApiResponse } from "./IdentityAccessApiResponse";
import { IdentityAccessApiVersion } from "./IdentityAccessApiVersion";

export class IdentityAccessPostRequest
{
    protected requestUrl: string;
    protected readonly BASE_URL = 'http://localhost:8080/api/';

    constructor(requestUrlPath: string)
    {
        this.requestUrl = `${this.BASE_URL}${requestUrlPath}`;
    }

    public async send<
        TRequestData, 
        TSuccessResponseData, 
        TErrorDetails
    >(
        requestData: TRequestData,
        identityAccessApiVersion: IdentityAccessApiVersion
    ): Promise<IdentityAccessApiResponse<TSuccessResponseData, TErrorDetails>>
    {
        // await this.fetchCsrfToken().handle();
        // const csrfToken = this.getCookie('XSRF-TOKEN');

        const response = await fetch(this.requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": `application/vnd.example.${identityAccessApiVersion}+json`,
                // "X-XSRF-TOKEN": csrfToken ?? ''
            },
            // credentials: 'include',
            body: JSON.stringify(requestData)
        });

        if (response.status >= 500) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseJson: IdentityAccessApiResponse<TSuccessResponseData, TErrorDetails> = await response.json();

        return responseJson;
    }

    // private fetchCsrfToken(): FetchCsrfToken
    // {
    //     return new FetchCsrfToken();
    // }

    // private getCookie(name: string): string | null {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    //     return null;
    // }
}