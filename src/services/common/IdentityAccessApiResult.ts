type ResponseData = {
    [key: string]: any;
}

export class IdentityAccessApiResult
{
    readonly status: string;
    readonly message: string;
    readonly data: ResponseData | null;

    constructor(status: string, message: string, data: ResponseData | null)
    {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}