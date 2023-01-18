import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { userCreate } from "../api/authApi";
import { emailValid, passwordValid } from "../utils/validation";

const SignUpForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    pwconfirm: "",
  });

  const { email, password, pwconfirm } = inputs;
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
                type="password"
                name="password"
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
            <Grid item xs={12}>
              <TextField
                label="비밀번호 확인"
                variant="outlined"
                fullWidth
                type="password"
                name="pwconfirm"
                value={pwconfirm}
                onChange={onChange}
                error={pwconfirm.length !== 0 && !(password === pwconfirm)}
                helperText={
                  pwconfirm.length !== 0 && !(password === pwconfirm)
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
              emailValid(email) &&
              passwordValid(password) &&
              password === pwconfirm
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
