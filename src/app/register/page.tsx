'use client'

import { Backdrop, Button, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect, useState } from "react";
import { useUserRegister } from "@/hooks/userRegister/UseUserRegister";
import { UserRegisterService } from "@/services/userRegister/UserRegisterService";
import { UserEmail } from "@/modules/userRegister/UserEmail";
import { UserPassword } from "@/modules/userRegister/UserPassword";
import { UserPasswordConfirmation } from "@/modules/userRegister/UserPasswordConfirmation";
import { UserRegisterData } from "@/modules/userRegister/UserRegisterData";
import { useRouter } from "next/navigation";


export default function registerUserPage()
{
  const [email, setEmail] = useState<UserEmail>(new UserEmail(''));
  const [password, setPassword] = useState<UserPassword>({value: ''});
  const [passwordConfirmation, setPasswordConfirmation] = useState<UserPasswordConfirmation>(new UserPasswordConfirmation('', password));

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const router = useRouter();

  const { userRegister, error, loading, userRegisterValidationErrorMessage, userRegisterSuccess} = useUserRegister({userRegisterService: new UserRegisterService()});

  const handleRequest = () => {
    const userRegisterData = new UserRegisterData(email, password, passwordConfirmation);
    userRegister(userRegisterData);
  }

  useEffect(() => {
    if (userRegisterSuccess) {
      router.push('/registrationConfirmation');
    }
  }, [userRegisterSuccess, router]);

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
        {userRegisterValidationErrorMessage && userRegisterValidationErrorMessage.getEmailError.map(
          (errorMessage, index) => <FormHelperText key={index} error>{errorMessage}</FormHelperText>
        )}
        <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
          <InputLabel htmlFor="password">パスワード</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword({value: e.target.value})}
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
            {userRegisterValidationErrorMessage && userRegisterValidationErrorMessage.getPasswordError.map(
              (errorMessage, index) => <FormHelperText key={index} error>{errorMessage}</FormHelperText>
            )}
        </FormControl>
        <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
          <InputLabel htmlFor="passwordConfirmation">パスワード確認用</InputLabel>
            <OutlinedInput
              id="passwordConfirmation"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPasswordConfirmation(new UserPasswordConfirmation(e.target.value, password))}
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
          {userRegisterValidationErrorMessage && userRegisterValidationErrorMessage.getPasswordConfirmationError.map(
            (errorMessage, index) => <FormHelperText key={index} error>{errorMessage}</FormHelperText>
          )}
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