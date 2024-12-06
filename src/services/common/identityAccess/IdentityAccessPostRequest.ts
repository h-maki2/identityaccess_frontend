import { IdentityAccessApiResult } from "./IdentityAccessApiResult";

interface Constructor<TReturnValue, TJsonValue> {
    new (status: string, data: TJsonValue): TReturnValue;
}

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
        TJsonValue, 
        TResponseData extends IdentityAccessApiResult<TJsonValue>
    >(
        requestData: TRequestData, 
        createClass: Constructor<TResponseData, TJsonValue>
    ): Promise<TResponseData>
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

        return new createClass(responsejson.status, responsejson.data);
    }
}