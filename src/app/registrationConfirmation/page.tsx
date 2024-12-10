'use client'

import { Stack, Typography } from "@mui/material";

export default function registrationConfirmationPage() 
{
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Stack
          component="form"
          sx={{ width: '100ch', mt: 13, justifyContent: 'center'}}
          spacing={2}
          noValidate
          autoComplete="off"
          alignItems="center"
        >
          <Typography variant="h4">
            まだ本登録は完了していません。
          </Typography>
          <Typography variant="h6" gutterBottom>
            先ほど入力したメールアドレス宛に認証済み更新メールを送信しました。
          </Typography>
          <Typography variant="h6" gutterBottom>
            そちらのメールから認証済みに更新を行い、本登録を完了してください。
          </Typography>
        </Stack>
      </div>
    </>
  )
}