import { UserRegisterErrorDetails } from "@/services/userRegister/UserRegisterService";
import { IdentityAccessApiResponse } from "@/services/common/identityAccess/IdentityAccessApiResponse";
import { UserEmail } from "./UserEmail";
import { UserPasswordConfirmation } from "./UserPasswordConfirmation";

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

    get getEmail(): string[]
    {
        return this.email;
    }

    get getPassword(): string[]
    {
        return this.password;
    }

    get getPasswordConfirmation(): string[]
    {
        return this.passwordConfirmation;
    }
}