import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";
import { UserPasswordConfirmation } from "./UserPasswordConfirmation";
import { UserRegisterValidationErrorMessage } from "./UserRegisterValidationErrorMessage";

/**
 * ユーザー登録リクエストデータ
 */
export type UserRegisterRequestData = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

/**
 * ユーザー登録情報
 */
export class UserRegisterData
{
    readonly email: UserEmail;
    readonly password: UserPassword;
    readonly passwordConfirmation: UserPasswordConfirmation;
    private validationErrorMessage: UserRegisterValidationErrorMessage;

    constructor(
        email: UserEmail, 
        password: UserPassword, 
        passwordConfirmation: UserPasswordConfirmation,
    )

    {
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
        this.validationErrorMessage = UserRegisterValidationErrorMessage.create(email, passwordConfirmation);
    }

    /**
     * ユーザー登録情報が無効かどうかを返す
     */
    public isInvalid(): boolean
    {
        return this.validationErrorMessage.hasValidationError();
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