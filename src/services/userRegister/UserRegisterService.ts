import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { IdentityAccessPostRequest } from "../common/identityAccess/IdentityAccessPostRequest";
import { IdentityAccessApiVersion } from "../common/identityAccess/IdentityAccessApiVersion";
import { UserRegisterValidationErrorMessage } from "@/modules/userRegister/UserRegisterValidationErrorMessage";
import { UserRegisterRequestData } from "@/modules/userRegister/UserRegisterRequestData";
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";

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

    public async register(userRegisterData: UserRegisterData): Promise<UserRegisterResult>
    {
        const response = await this.identityAccessPostRequest().send<
            UserRegisterRequestData,
            [],
            UserRegisterErrorDetails
        > (
            userRegisterData.toRequestData(),
            IdentityAccessApiVersion.V1
        );

        return {
            isSuccess: response.success ? true : false,
            validationErrorMessage: UserRegisterValidationErrorMessage.createFromApiResponse(response)
        };
    }

    private identityAccessPostRequest(): IdentityAccessPostRequest
    {
        return new IdentityAccessPostRequest(this.requestUrlPath);
    }
}