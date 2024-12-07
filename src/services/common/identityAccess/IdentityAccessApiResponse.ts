export type IdentityAccessApiResponse<TResponseData, TErrorDetails> = {
    readonly success: boolean;
    readonly data?: TResponseData;
    readonly error?: {
        code: string;
        details: TErrorDetails;
    }
}