import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService";
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { UserRegisterApiResponse, UserRegisterApiResponseValue } from "./UserRegisterApiResponse";
import { ValidationErrorMessageData } from "@/modules/common/ValidationErrorMessageData";
import { IdentityAccessPostRequest } from "../common/identityAccess/IdentityAccessPostRequest";

export class UserRegisterService implements IUserRegisterService
{
    private requestUrlPath: string;

    constructor()
    {
        this.requestUrlPath = 'userRegistration';
    }

    public async register(userRegisterData: UserRegisterData): Promise<UserRegisterResult>
    {
        const apiResponse = await this.identityAccessPostRequest().send(
            userRegisterData.toRequestData(),
            UserRegisterApiResponse
        );

        return new UserRegisterResult(apiResponse.isSuccess, this.toValidationErrorMessageDataList(apiResponse.data));
    }

    private identityAccessPostRequest(): IdentityAccessPostRequest
    {
        return new IdentityAccessPostRequest(this.requestUrlPath);
    }

    private toValidationErrorMessageDataList(reponseData: UserRegisterApiResponseValue): ValidationErrorMessageData[]
    {
        let result: ValidationErrorMessageData[] = [];

        Object.entries(reponseData.validationErrorMessageList).forEach(([errorField, errorMessageList]: [string, string[]]) => {
            result.push(new ValidationErrorMessageData(errorField, errorMessageList));
        });

        return result;
    }
}