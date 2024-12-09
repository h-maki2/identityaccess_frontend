import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService"
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { useEffect, useState } from "react";

// interface UseUserRegisterProps {
//     userRegisterService: IUserRegisterService;
// }

interface UseUserRegisterReturn {
    userRegister: (userRegisterData: UserRegisterData, userRegisterService: IUserRegisterService) => Promise<void>;
    userRegisterResult: UserRegisterResult | null;
    error: boolean;
    loading: boolean;
}

export const useUserRegister = (): UseUserRegisterReturn => {
    const [userRegisterResult, setUserRegisterResult] = useState<UserRegisterResult | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const userRegister = async (
        userRegisterData: UserRegisterData,
        userRegisterService: IUserRegisterService
    ) => {
        setLoading(true);
        setUserRegisterResult(null);
        setError(false);

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

        console.log(userRegisterResult);
    };
    
    return { userRegister, userRegisterResult, error, loading };
}