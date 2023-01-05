import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "../types/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailVali, setEmailVali] = useState(false);
  const [passwordVali, setPasswordVali] = useState(false);
  const validation = {
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g,
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    if (!currentEmail || validation.email.test(currentEmail)) {
      setEmailVali(true);
    }
    setEmail(currentEmail);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentpassword = e.target.value;
    if (!currentpassword || validation.password.test(currentpassword)) {
      setPasswordVali(true);
    }
    setPassword(currentpassword);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const res: ResponseType = await axios.post("/users/login", data);
      setEmail("");
      setPassword("");
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
                id="outlined-basic"
                label="이메일"
                variant="outlined"
                type="email"
                value={email}
                onChange={onChangeEmail}
                error={!emailVali && email.length ? true : false}
                helperText={
                  !emailVali && email.length ? "이메일 형식이 아닙니다." : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="비밀번호"
                variant="outlined"
                type="password"
                value={password}
                onChange={onChangePassword}
                error={!passwordVali && password.length ? true : false}
                helperText={
                  !passwordVali && password.length
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
            disabled={passwordVali && emailVali ? false : true}
          >
            로그인
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default LoginForm;
