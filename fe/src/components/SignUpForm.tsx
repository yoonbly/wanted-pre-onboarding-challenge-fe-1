import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { userCreate } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    pwconfirm: "",
  });
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
    isPwConfirm: false,
  });

  const { email, password, pwconfirm } = inputs;
  const user = { email, password };

  const validation = {
    emailValid: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    passwordValid: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g,
  };

  useEffect(() => {
    setIsValid({
      isEmail: validation.emailValid.test(email),
      isPassword: validation.passwordValid.test(password),
      isPwConfirm: password === pwconfirm,
    });
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
    userCreate(user);
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>회원가입</h3>
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
                fullWidth
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
                fullWidth
                type="password"
                name="password"
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
            <Grid item xs={12}>
              <TextField
                label="비밀번호 확인"
                variant="outlined"
                fullWidth
                type="password"
                name="pwconfirm"
                value={pwconfirm}
                onChange={onChange}
                error={!isValid.isPwConfirm && pwconfirm.length ? true : false}
                helperText={
                  !isValid.isPwConfirm && pwconfirm.length
                    ? "비밀번호가 일치하지 않습니다."
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
            disabled={
              isValid.isEmail && isValid.isPassword && isValid.isPwConfirm
                ? false
                : true
            }
          >
            회원가입
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default SignUpForm;
