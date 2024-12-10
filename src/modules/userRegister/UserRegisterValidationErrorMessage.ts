import { UserRegisterErrorDetails } from "@/services/userRegister/UserRegisterService";
import { IdentityAccessApiResponse } from "@/services/common/identityAccess/IdentityAccessApiResponse";
import { UserEmail } from "./UserEmail";
import { UserPasswordConfirmation } from "./UserPasswordConfirmation";

/**
 * ユーザー登録バリデーションエラーメッセージ
 */
export class UserRegisterValidationErrorMessage
{
    private email: string[];
    private password: string[];
    private passwordConfirmation: string[];

    private constructor(email: string[], password: string[], passwordConfirmation: string[])
    {
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
    }

    public static create(
        userEmail: UserEmail,
        passwordConfirmation: UserPasswordConfirmation
    ): UserRegisterValidationErrorMessage
    {
        let emailValidationErrorMessages: string[] = [];
        if (userEmail.hasValidationError()) {
            emailValidationErrorMessages = [userEmail.validationErrorMessage];
        }

        let passwordConfirmationValidationErrorMessages: string[] = [];
        if (passwordConfirmation.hasValidationError()) {
            passwordConfirmationValidationErrorMessages = [passwordConfirmation.validationErrorMessage];
        }

        return new UserRegisterValidationErrorMessage(
            emailValidationErrorMessages,
            [],
            passwordConfirmationValidationErrorMessages
        );
    }

    /**
     * ユーザー登録APIのレスポンスからエラーメッセージを生成する
     */
    public static createFromApiResponse(
        apiResponse: IdentityAccessApiResponse<[], UserRegisterErrorDetails>
    ): UserRegisterValidationErrorMessage
    {
        if (apiResponse.success) {
            return new UserRegisterValidationErrorMessage([], [], []);
        }

        return new UserRegisterValidationErrorMessage(
            apiResponse.error?.details.email ?? [],
            apiResponse.error?.details.password ?? [],
            apiResponse.error?.details.passwordConfirmation ?? []
        );
    }

    /**
     * バリデーションエラーがあるかどうかを返す
     */
    public hasValidationError(): boolean
    {
        return this.email.length > 0 || this.password.length > 0 || this.passwordConfirmation.length > 0;
    }

    get getEmailError(): string[]
    {
        return this.email;
    }

    get getPasswordError(): string[]
    {
        return this.password;
    }

    get getPasswordConfirmationError(): string[]
    {
        return this.passwordConfirmation;
    }
}