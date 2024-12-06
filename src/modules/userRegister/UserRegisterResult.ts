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

    public getErrorMessageListFrom(fieldName: string): string[]
    {
        const validationErrorMessageData = this.validationErrorMessageDataList.find(data => data.fieldName === fieldName);

        if (validationErrorMessageData === undefined) {
            return [];
        }

        return validationErrorMessageData.errorMessageList;
    }
}