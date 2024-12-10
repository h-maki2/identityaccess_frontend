import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService"
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterRequestData } from "@/modules/userRegister/UserRegisterRequestData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { useEffect, useState } from "react";

interface UseUserRegisterProps {
    userRegisterService: IUserRegisterService;
}

interface UseUserRegisterReturn {
    userRegister: (userRegisterData: UserRegisterData) => Promise<void>;
    error: boolean;
    loading: boolean;
    userRegisterResult: UserRegisterResult | null;
}

export const useUserRegister = ({userRegisterService}: UseUserRegisterProps): UseUserRegisterReturn => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [userRegisterResult, setUserRegisterResult] = useState<UserRegisterResult | null>(null);

    const userRegister = async (userRegisterData: UserRegisterData) => {
        setLoading(true);
        setError(false);
        setUserRegisterResult(null);
        
        try {
            const result = await userRegisterService.register(userRegisterData);
            setUserRegisterResult(result);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    
    return { userRegister, error, loading, userRegisterResult};
}