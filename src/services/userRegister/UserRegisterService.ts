import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { IdentityAccessPostRequest } from "../common/identityAccess/IdentityAccessPostRequest";
import { IdentityAccessApiVersion } from "../common/identityAccess/IdentityAccessApiVersion";
import { UserRegisterValidationErrorMessage } from "@/modules/userRegister/UserRegisterValidationErrorMessage";
import { UserRegisterRequestData } from "@/modules/userRegister/UserRegisterRequestData";

export type UserRegisterErrorDetails = {
    email: string[];
    password: string[];
    passwordConfirmation: string[];
}

export class UserRegisterService implements IUserRegisterService
{
    private requestUrlPath: string;

    constructor()
    {
        this.requestUrlPath = 'userRegistration';
    }

    public async register(userRegisterRequestData: UserRegisterRequestData): Promise<UserRegisterResult>
    {
        const response = await this.identityAccessPostRequest().send<
            UserRegisterRequestData,
            [],
            UserRegisterErrorDetails
        > (
            userRegisterRequestData,
            IdentityAccessApiVersion.V1
        );

        if (response.success) {
            return {
                isSuccess: true,
            };
        }

        return {
            isSuccess: false,
            validationErrorMessage: {
                email: response.error?.details.email ?? [],
                password: response.error?.details.password ?? [],
                passwordConfirmation: response.error?.details.passwordConfirmation ?? []
            }
        };
    }

    private identityAccessPostRequest(): IdentityAccessPostRequest
    {
        return new IdentityAccessPostRequest(this.requestUrlPath);
    }
}