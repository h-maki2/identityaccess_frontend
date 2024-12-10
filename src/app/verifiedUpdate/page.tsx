import { Backdrop, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function verifiedUpdatePage()
{
  const [oneTimePassword, setOneTimePassword] = useState<string | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const oneTimeToken = searchParams.get('token');

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
        <input type="hidden" name="oneTimeToken" value={oneTimeToken ?? ''}/>
      </div>
    </>
  )
}