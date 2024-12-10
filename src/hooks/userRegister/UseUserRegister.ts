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
    userRegister: (userRegisterData: UserRegisterData) => Promise<Boolean>;
    error: boolean;
    loading: boolean;
    userRegisterValidationErrorMessage: UserRegisterValidationErrorMessage | null;
}

export const useUserRegister = ({userRegisterService}: UseUserRegisterProps): UseUserRegisterReturn => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [userRegisterValidationErrorMessage, setUserRegisterValidationErrorMessage] = useState<UserRegisterValidationErrorMessage | null>(null);
    const [userRegisterSuccess, setUserRegisterSuccess] = useState<boolean>(false);

    const userRegister = async (userRegisterData: UserRegisterData): Promise<Boolean> => {
        setLoading(true);
        setError(false);
        setUserRegisterValidationErrorMessage(null);
        
        try {
            const result = await userRegisterService.register(userRegisterData);
            setUserRegisterValidationErrorMessage(result.validationErrorMessage);
            setUserRegisterSuccess(result.isSuccess);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }

        return userRegisterSuccess;
    };
    
    return { userRegister, error, loading, userRegisterValidationErrorMessage};
}