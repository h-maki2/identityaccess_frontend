export abstract class IdentityAccessApiResult
{
    readonly isSuccess: boolean;
    abstract readonly data: any;

    constructor(status: string)
    {
        this.isSuccess = status === 'success';
    }
}