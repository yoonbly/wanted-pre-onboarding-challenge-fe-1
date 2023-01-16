import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { userLogin } from "../api/authApi";
import { loginAccout } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { email, password } = inputs;
  const user = { email, password };

  const validation = {
    emailValid: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    passwordValid: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g,
  };

  useEffect(() => {
    setIsValid({
      isEmail: validation.emailValid.test(email),
      isPassword: validation.passwordValid.test(password),
    });
    console.log("render");
  }, [inputs]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userLogin(user);
    dispatch(loginAccout(user));
    navigate("/");
  };
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>로그인</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl component="fieldset" variant="standard">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="이메일"
                variant="outlined"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                error={!isValid.isEmail && email.length ? true : false}
                helperText={
                  !isValid.isEmail && email.length
                    ? "이메일 형식이 아닙니다."
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="비밀번호"
                variant="outlined"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                error={!isValid.isPassword && password.length ? true : false}
                helperText={
                  !isValid.isPassword && password.length
                    ? "비밀번호는 숫자, 영문자를 포함한 8글자 이상이어야 합니다."
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
            disabled={isValid.isEmail && isValid.isPassword ? false : true}
          >
            로그인
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default LoginForm;
