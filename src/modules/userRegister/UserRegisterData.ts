import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";

type UserRegisterRequestData = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export class UserRegisterData
{
    readonly email: UserEmail;
    readonly password: UserPassword;
    readonly passwordConfirmation: UserPassword;

    constructor(email: UserEmail, password: UserPassword, passwordConfirmation: UserPassword)
    {
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
    }

    public isValid(): boolean
    {
        if (!this.email.isValid())
        {
            return false;
        }

        if (!this.password.equals(this.passwordConfirmation))
        {
            return false;
        }

        return true;
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