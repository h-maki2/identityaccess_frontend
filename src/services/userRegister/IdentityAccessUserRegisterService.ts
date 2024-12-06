import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService";
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { IdentityAccessPostRequest } from "../common/identityAccess/IdentityAccessPostRequest";
import { IdentityAccessApiResponse } from "../common/identityAccess/IdentityAccessApiResponse";
import { UserRegisterApiResponse } from "./UserRegisterApiResponse";

export class UserRegisterService implements IUserRegisterService
{
    private requestUrlPath: string;

    constructor()
    {
        this.requestUrlPath = 'userRegistration';
    }

    public async register(userRegisterData: UserRegisterData): UserRegisterResult
    {
        const userRegisterResult = this.identityAccessPostRequest().send(
            userRegisterData.toRequestData(),
            UserRegisterApiResponse
        );

        userRegisterResult.then((result: UserRegisterApiResponse) => {
            return new UserRegisterResult(result.isSuccess, result.data);
        });
    }

    private identityAccessPostRequest(): IdentityAccessPostRequest
    {
        return new IdentityAccessPostRequest(this.requestUrlPath);
    }

    private toValidationErrorMessageDataList(result: UserRegisterApiResponse): ValidationErrorMessageData[]
    {

    }
}