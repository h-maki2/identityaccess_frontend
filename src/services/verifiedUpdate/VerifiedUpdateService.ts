import { IVerifiedUpdateService } from "@/modules/verifiedUpdate/IVerifiedUpdateService";
import { VerifiedUpdateData } from "@/modules/verifiedUpdate/VerifiedUpdateData";
import { VerifiedUpdateResult } from "@/modules/verifiedUpdate/VerifiedUpdateResult";
import { IdentityAccessPostRequest } from "../common/identityAccess/IdentityAccessPostRequest";
import { IdentityAccessApiVersion } from "../common/identityAccess/IdentityAccessApiVersion";

export type VerifiedUpdateErrorDetails = {
    validationErrorMessage: string;
}

export class VerifiedUpdateService implements IVerifiedUpdateService
{
    private requestUrlPath: string;

    constructor()
    {
        this.requestUrlPath = 'verifiedUpdate';
    }

    async verifiedUpdate(verifiedUpdateData: VerifiedUpdateData): Promise<VerifiedUpdateResult>
    {
        const response = await this.identityAccessPostRequest().send<
            VerifiedUpdateData,
            [],
            VerifiedUpdateErrorDetails
        >(
            verifiedUpdateData,
            IdentityAccessApiVersion.V1
        )

        return {
            isSuccess: response.success ? true : false,
            validationErrorMessage: response.error?.details.validationErrorMessage ?? ''
        }
    }

    private identityAccessPostRequest(): IdentityAccessPostRequest
    {
        return new IdentityAccessPostRequest(this.requestUrlPath);
    }
}