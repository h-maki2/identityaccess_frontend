import { ValidationErrorMessageData } from "../common/ValidationErrorMessageData";

export class UserRegisterResult
{
    readonly isSuccess: boolean;
    readonly validationErrorMessageDataList: ValidationErrorMessageData[];

    constructor(isSuccess: boolean, validationErrorMessageDataList: ValidationErrorMessageData[])
    {
        this.isSuccess = isSuccess;
        this.validationErrorMessageDataList = validationErrorMessageDataList;
    }
}