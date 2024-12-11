import { Backdrop, Button, CircularProgress, FormHelperText, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifiedUpdate } from "@/hooks/verifiedUpdate/UseVerifiedUpdate";
import { VerifiedUpdateService } from "@/services/verifiedUpdate/VerifiedUpdateService";
import { VerifiedUpdateData } from "@/modules/verifiedUpdate/VerifiedUpdateData";

export default function verifiedUpdatePage()
{
  const [oneTimePassword, setOneTimePassword] = useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const oneTimeToken = searchParams.get('token');

  const { verifiedUpdate, error, loading, validationErrorMessage, updateSuccess } = useVerifiedUpdate({verifiedUpdateService: new VerifiedUpdateService()});

  const handleRequest = () => {
    const verifiedUpdateData: VerifiedUpdateData = {
      oneTimePassword: oneTimePassword ?? '', 
      oneTimeToken: oneTimeToken ?? ''
    }
    verifiedUpdate(verifiedUpdateData);
  }

  // useEffect(() => {
  //   if (updateSuccess) {
  //     router.push('/verifiedUpdateComplete');
  //   }
  // }, [updateSuccess, router]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Stack
          component="form"
          sx={{ width: '25ch', mt: 13, justifyContent: 'center'}}
          spacing={2}
          noValidate
          autoComplete="off"
          alignItems="center"
        >
          <TextField
            id="oneTimePassword"
            label="Number"
            type="number"
            variant="standard"
            onChange={(e) => setOneTimePassword(e.target.value)}
          />
          {validationErrorMessage && <FormHelperText error>{validationErrorMessage}</FormHelperText>}
          <Button
            variant="contained"
            sx={{ m: 1, width: '25ch' }}
            onClick={handleRequest}
          >
            登録
          </Button>
        </Stack>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading ? loading : false}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  )
}