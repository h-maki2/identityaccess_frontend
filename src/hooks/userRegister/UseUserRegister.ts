import { IUserRegisterService } from "@/modules/userRegister/IUserRegisterService"
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { useEffect, useState } from "react";

interface UseUserRegisterProps {
    userRegisterService: IUserRegisterService;
    userRegisterData: UserRegisterData;
    setLoadingFn: React.Dispatch<React.SetStateAction<boolean>>
}

interface UseUserRegisterReturn {
    userRegisterResult: UserRegisterResult | null;
    error: boolean;
}

export const useUserRegister = ({userRegisterService, userRegisterData, setLoadingFn}: UseUserRegisterProps): UseUserRegisterReturn => {
    const [userRegisterResult, setUserRegisterResult] = useState<UserRegisterResult | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const userRegister = async () => {
          try {
            const result = await userRegisterService.register(userRegisterData);
            setUserRegisterResult(result);
          } catch (err) {
            setError(true);
          } finally {
            setLoadingFn(false);
          }
        };
    
        userRegister();
      }, []);
    
    return { userRegisterResult, error };
}