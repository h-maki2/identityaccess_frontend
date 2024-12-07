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
        const response = await this.identityAccessPostRequest().send(
            userRegisterData.toRequestData(),
            UserRegisterApiResponse
        );

        if (response.status === 200) {
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
                email: [],
                password: [],
                passwordConfirmation: []
            }
        };
    }

    private identityAccessPostRequest(): IdentityAccessPostRequest
    {
        return new IdentityAccessPostRequest(this.requestUrlPath);
    }
}