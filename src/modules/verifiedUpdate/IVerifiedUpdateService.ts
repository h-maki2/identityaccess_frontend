import { VerifiedUpdateData } from "./VerifiedUpdateData";
import { VerifiedUpdateResult } from "./VerifiedUpdateResult";

/**
 * 認証済み更新を行う
 */
export interface IVerifiedUpdateService 
{
    verifiedUpdate(verifiedUpdateData: VerifiedUpdateData): Promise<VerifiedUpdateResult>;
}