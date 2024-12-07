import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService"
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { useEffect, useState } from "react";

interface UseUserRegisterProps {
    userRegisterService: IUserRegisterService;
    userRegisterData: UserRegisterData;
}

interface UseUserRegisterReturn {
    userRegister: () => Promise<void>;
    userRegisterResult: UserRegisterResult | null;
    error: boolean;
    loading: boolean;
}

export const useUserRegister = ({userRegisterService, userRegisterData}: UseUserRegisterProps): UseUserRegisterReturn => {
    const [userRegisterResult, setUserRegisterResult] = useState<UserRegisterResult | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const userRegister = async () => {
        if (!userRegisterData.isValid()) {
            setUserRegisterResult({
                isSuccess: false,
                validationErrorMessage: userRegisterData.getValidationErrorMessage()
            })
            setLoading(false);
            return;
        }

        try {
            const result = await userRegisterService.register(userRegisterData);
            setUserRegisterResult(result);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    
    return { userRegister, userRegisterResult, error, loading };
}