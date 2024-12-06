'use client'

import { Backdrop, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react";
import { UserEmail } from "@/modules/userRegister/UserEmail";
import { UserPassword } from "@/modules/userRegister/UserPassword";
import { UserRegisterResult } from "@/modules/userRegister/UserRegisterResult";
import { useUserRegister } from "@/hooks/userRegister/UseUserRegister";
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { UserRegisterService } from "@/services/userRegister/UserRegisterService";


export default function registerUserPage()
{
  const [email, setEmail] = useState<UserEmail>(new UserEmail(''));
  const [password, setPassword] = useState<UserPassword>(new UserPassword(''));
  const [passwordConfirmation, setPasswordConfirmation] = useState<UserPassword>(new UserPassword(''));

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { userRegister, userRegisterResult, error, loading } = useUserRegister({
    userRegisterService: new UserRegisterService(),
    userRegisterData: new UserRegisterData(email, password, passwordConfirmation)
  });

  const handleRequest = () => {
    userRegister();
  }

  return (
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
          id="email"
          label="メールアドレス"
          sx={{ m: 1, width: '50ch' }}
          onChange={(e) => setEmail(new UserEmail(e.target.value))}
        />
        <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
          <InputLabel htmlFor="password">パスワード</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(new UserPassword(e.target.value))}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
        </FormControl>
        <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
          <InputLabel htmlFor="passwordConfirmation">パスワード確認用</InputLabel>
            <OutlinedInput
              id="passwordConfirmation"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPasswordConfirmation(new UserPassword(e.target.value))}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
        </FormControl>
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
  )
}