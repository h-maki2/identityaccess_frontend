import { IVerifiedUpdateService } from "@/modules/verifiedUpdate/IVerifiedUpdateService";
import { VerifiedUpdateData } from "@/modules/verifiedUpdate/VerifiedUpdateData";
import { VerifiedUpdateErrorDetail } from "@/services/verifiedUpdate/VerifiedUpdateService";
import { useState } from "react";

type UseVerifiedUpdateProps = {
    verifiedUpdateService: IVerifiedUpdateService;
}

type UseVerifiedUpdateReturn = {
    verifiedUpdate: (verifiedUpdateData: VerifiedUpdateData) => Promise<Boolean>;
    error: boolean;
    loading: boolean;
    validationErrorMessage: string | null;
}

export const useVerifiedUpdate = ({verifiedUpdateService}: UseVerifiedUpdateProps): UseVerifiedUpdateReturn => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [validationErrorMessage, setValidationErrorMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const verifiedUpdate = async (verifiedUpdateData: VerifiedUpdateData): Promise<Boolean> => {
        setLoading(true);
        setError(false);
        setValidationErrorMessage(null);
        
        try {
            const result = await verifiedUpdateService.verifiedUpdate(verifiedUpdateData);
            setValidationErrorMessage(result.validationErrorMessage);
            setSuccess(result.isSuccess);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }

        return success;
    }

    return { verifiedUpdate, error, loading, validationErrorMessage };
}