import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService"
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { useEffect, useState } from "react";

// interface UseUserRegisterProps {
//     userRegisterService: IUserRegisterService;
// }

interface UseUserRegisterReturn {
    userRegister: (userRegisterData: UserRegisterData, userRegisterService: IUserRegisterService, setUserRegisterResult: React.Dispatch<React.SetStateAction<UserRegisterResult | null>>) => Promise<void>;
    error: boolean;
    loading: boolean;
}

export const useUserRegister = (): UseUserRegisterReturn => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const userRegister = async (
        userRegisterData: UserRegisterData,
        userRegisterService: IUserRegisterService,
        setUserRegisterResult: React.Dispatch<React.SetStateAction<UserRegisterResult | null>>
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
    };
    
    return { userRegister, error, loading };
}