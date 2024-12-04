export class ValidationErrorMessageData {
    readonly fieldName: string;
    readonly errorMessageList: string[];

    constructor(fieldName: string, errorMessageList: string[]) {
        this.fieldName = fieldName;
        this.errorMessageList = errorMessageList;
    }
}