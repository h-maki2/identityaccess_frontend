export class UserEmail
{
    readonly value: string;
    readonly validationErrorMessage: string;

    constructor(value: string)
    {
        this.value = value;

        if (!this.isValid()) {
            this.validationErrorMessage = '無効なメールアドレスです。';
        } else {
            this.validationErrorMessage = '';
        }
    }

    public hasValidationError(): boolean
    {
        return this.validationErrorMessage !== '';
    }

    private isValid(): boolean
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.value);
    }
}