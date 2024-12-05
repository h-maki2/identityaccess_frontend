import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService";
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { IdentityAccessPostRequest } from "../common/identityAccess/IdentityAccessPostRequest";
import { IdentityAccessApiResult } from "../common/identityAccess/IdentityAccessApiResult";

export class IdentityAccessUserRegisterService implements IUserRegisterService
{
    private requestUrlPath: string;

    constructor()
    {
        this.requestUrlPath = 'userRegistration';
    }

    public async register(userRegisterData: UserRegisterData): UserRegisterResult
    {
        const identityAccessApiResult = this.identityAccessPostRequest().send(userRegisterData.toRequestData());
        identityAccessApiResult.then((result: IdentityAccessApiResult) => {
            return new UserRegisterResult(result.isSuccess)
        });
    }

    private identityAccessPostRequest(): IdentityAccessPostRequest
    {
        return new IdentityAccessPostRequest(this.requestUrlPath);
    }

    private toValidationErrorMessageDataList(identityAccessApiResult: IdentityAccessApiResult): ValidationErrorMessageData[]
    {

    }
}