import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService";
import { UserRegisterData, UserRegisterRequestData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { IdentityAccessPostRequest } from "../common/identityAccess/IdentityAccessPostRequest";
import { IdentityAccessApiVersion } from "../common/identityAccess/IdentityAccessApiVersion";
import { UserRegisterValidationErrorMessage } from "@/modules/userRegister/UserRegisterValidationErrorMessage";

export class UserRegisterService implements IUserRegisterService
{
    private requestUrlPath: string;

    constructor()
    {
        this.requestUrlPath = 'userRegistration';
    }

    public async register(userRegisterData: UserRegisterData): Promise<UserRegisterResult>
    {
        const response = await this.identityAccessPostRequest().send<
            UserRegisterRequestData,
            [],
            UserRegisterValidationErrorMessage
        > (
            userRegisterData.toRequestData(),
            IdentityAccessApiVersion.V1
        );

        if (response.success) {
            return {
                isSuccess: true,
                validationErrorMessage: {
                    email: [],
                    password: [],
                    passwordConfirmation: []
                }
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