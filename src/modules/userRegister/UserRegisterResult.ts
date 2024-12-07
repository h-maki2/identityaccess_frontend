import { UserRegisterValidationErrorMessage } from "./UserRegisterValidationErrorMessage";

export type UserRegisterResult = {
    readonly isSuccess: boolean;
    readonly validationErrorMessage: UserRegisterValidationErrorMessage;
}