import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { userLogin } from "../api/authApi";
import { useAppDispatch } from "../redux/hooks";
import { Link } from "react-router-dom";
import { loginAccout } from "../redux/userSlice";
import { emailValid, passwordValid } from "../utils/validation";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const { email, password } = inputs;
  const user = { email, password };

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
    localStorage.getItem("token") && dispatch(loginAccout());
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
                fullWidth
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                error={email.length !== 0 && !emailValid(email)}
                helperText={
                  email.length !== 0 && !emailValid(email)
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
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                error={password.length !== 0 && !passwordValid(password)}
                helperText={
                  password.length !== 0 && !passwordValid(password)
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
            disabled={
              emailValid(email) && passwordValid(password) ? false : true
            }
          >
            로그인
          </Button>
        </FormControl>
      </Box>
      <div>🤔 아직 회원이 아니라면?</div>
      <Link to="/auth/signup"> {`회원가입 하러 가기`}</Link>
    </div>
  );
};

export default LoginForm;
