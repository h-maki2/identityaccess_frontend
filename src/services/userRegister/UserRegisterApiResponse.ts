import { ValidationErrorMessageData } from "@/modules/common/ValidationErrorMessageData";
import { IdentityAccessApiResponse } from "../common/identityAccess/IdentityAccessApiResponse";

export type UserRegisterApiResponseValue = {
    validationErrorMessageList : { [key: string]: string[] }
};

export class UserRegisterApiResponse extends IdentityAccessApiResponse<UserRegisterApiResponseValue>
{
    readonly data: UserRegisterApiResponseValue;

    constructor(status: string, data: UserRegisterApiResponseValue)
    {
        super(status);
        this.data = data;
    }
}