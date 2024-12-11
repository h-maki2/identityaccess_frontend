import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService"
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterRequestData } from "@/modules/userRegister/UserRegisterRequestData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { UserRegisterValidationErrorMessage } from "@/modules/userRegister/UserRegisterValidationErrorMessage";
import { useState } from "react";

interface UseUserRegisterProps {
    userRegisterService: IUserRegisterService;
}

interface UseUserRegisterReturn {
    userRegister: (userRegisterData: UserRegisterData) => Promise<void>;
    error: boolean;
    loading: boolean;
    userRegisterValidationErrorMessage: UserRegisterValidationErrorMessage | null;
    userRegisterSuccess: Boolean;
}

/**
 * ユーザー登録を行うカスタムフック
 */
export const useUserRegister = ({userRegisterService}: UseUserRegisterProps): UseUserRegisterReturn => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [userRegisterValidationErrorMessage, setUserRegisterValidationErrorMessage] = useState<UserRegisterValidationErrorMessage | null>(null);
    const [userRegisterSuccess, setUserRegisterSuccess] = useState<Boolean>(false);

    const userRegister = async (userRegisterData: UserRegisterData): Promise<void> => {
        setLoading(true);
        setError(false);
        setUserRegisterValidationErrorMessage(null);
        
        if (userRegisterData.isInvalid()) {
            setUserRegisterValidationErrorMessage(userRegisterData.getValidationErrorMessage());
            setUserRegisterSuccess(false);
            setLoading(false);
            return;
        }
        
        try {
            const result: UserRegisterResult = await userRegisterService.register(userRegisterData);
            setUserRegisterValidationErrorMessage(result.validationErrorMessage);
            setUserRegisterSuccess(result.isSuccess);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    
    return { userRegister, error, loading, userRegisterValidationErrorMessage, userRegisterSuccess };
}