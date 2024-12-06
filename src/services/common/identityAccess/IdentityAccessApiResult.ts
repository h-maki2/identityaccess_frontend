export abstract class IdentityAccessApiResult<TJsonValue>
{
    readonly isSuccess: boolean;
    abstract readonly data: TJsonValue | null;

    constructor(status: string)
    {
        this.isSuccess = status === 'success';
    }
}