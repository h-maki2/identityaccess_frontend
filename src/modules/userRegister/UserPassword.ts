export type UserPassword = {
    value: string;
}

export class UserPasswordConfirmation
{
    readonly value: string;
    readonly validationErrorMessage: string;

    constructor(value: string, password: UserPassword)
    {
        this.value = value;

        if (this.isEquals(password)) {
            this.validationErrorMessage = '';
        } else {
            this.validationErrorMessage = 'パスワードが一致しません。';
        }
    }

    public hasValidationError(): boolean
    {
        return this.validationErrorMessage !== '';
    }

    private isEquals(password: UserPassword): boolean
    {
        return this.value === password.value;
    }
}