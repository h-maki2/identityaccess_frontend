import { VerifiedUpdateData } from "./VerifiedUpdateData";
import { VerifiedUpdateResult } from "./VerifiedUpdateResult";

export interface IVerifiedUpdateService 
{
    verifiedUpdate(verifiedUpdateData: VerifiedUpdateData): Promise<VerifiedUpdateResult>;
}