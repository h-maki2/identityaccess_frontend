import { UserEmail } from "./UserEmail";
import { UserPassword, UserPasswordConfirmation } from "./UserPassword";
import { UserRegisterValidationErrorMessage } from "./UserRegisterValidationErrorMessage";

type UserRegisterRequestData = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export class UserRegisterData
{
    readonly email: UserEmail;
    readonly password: UserPassword;
    readonly passwordConfirmation: UserPasswordConfirmation;
    private validationErrorMessage: UserRegisterValidationErrorMessage;

    constructor(email: UserEmail, password: UserPassword, passwordConfirmation: UserPasswordConfirmation)
    {
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
        this.validationErrorMessage = {
            email: [],
            password: [],
            passwordConfirmation: []
        }
    }

    public isValid(): boolean
    {
        let isValid = true;
        if (this.email.hasValidationError()) {
            this.validationErrorMessage.email = [this.email.validationErrorMessage];
            isValid = false;
        }

        if (this.passwordConfirmation.hasValidationError()) {
            this.validationErrorMessage.password = [this.passwordConfirmation.validationErrorMessage];
            isValid = false;
        }

        return isValid;
    }

    public getValidationErrorMessage(): UserRegisterValidationErrorMessage
    {
        return this.validationErrorMessage;
    }

    public toRequestData(): UserRegisterRequestData
    {
        return {
            email: this.email.value,
            password: this.password.value,
            passwordConfirmation: this.passwordConfirmation.value
        };
    }
}