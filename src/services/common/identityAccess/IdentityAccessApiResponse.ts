export type IdentityAccessApiResponse<TSuccessResponseData, TErrorDetails> = {
    readonly success: boolean;
    readonly data?: TSuccessResponseData;
    readonly error?: {
        code: string;
        details: TErrorDetails;
    }
}