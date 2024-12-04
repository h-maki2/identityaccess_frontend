import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";

export class UserRegisterData
{
    private email: UserEmail;
    private password: UserPassword;
    private passwordConfirmation: UserPassword;

    constructor(email: UserEmail, password: UserPassword, passwordConfirmation: UserPassword)
    {
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
    }

    public getEmail(): UserEmail
    {
        return this.email;
    }

    public getPassword(): UserPassword
    {
        return this.password;
    }

    public getPasswordConfirmation(): UserPassword
    {
        return this.passwordConfirmation;
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
}