import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService"
import { UserRegisterRequestData } from "@/modules/userRegister/UserRegisterRequestData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { useEffect, useState } from "react";

// interface UseUserRegisterProps {
//     userRegisterService: IUserRegisterService;
// }

interface UseUserRegisterReturn {
    userRegister: (userRegisterRequestData: UserRegisterRequestData, userRegisterService: IUserRegisterService, setUserRegisterResult: React.Dispatch<React.SetStateAction<UserRegisterResult | null>>) => Promise<void>;
    error: boolean;
    loading: boolean;
}

export const useUserRegister = (): UseUserRegisterReturn => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const userRegister = async (
        userRegisterRequestData: UserRegisterRequestData,
        userRegisterService: IUserRegisterService,
        setUserRegisterResult: React.Dispatch<React.SetStateAction<UserRegisterResult | null>>
    ) => {
        setLoading(true);

        try {
            const result = await userRegisterService.register(userRegisterRequestData);
            setUserRegisterResult(result);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    
    return { userRegister, error, loading };
}