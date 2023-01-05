import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "../types/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwconfirm, setPwConfirm] = useState("");
  const navigate = useNavigate();
  // validation
  const [emailVali, setEmailVali] = useState(false);
  const [passwordVali, setPasswordVali] = useState(false);
  const [pwconfirmVali, setPwconfirmVali] = useState(false);
  const validation = {
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g,
  };
  // onChange
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
  const onChangePwConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmpassword = e.target.value;
    if (password == confirmpassword) {
      setPwconfirmVali(true);
    }
    setPwConfirm(confirmpassword);
  };
  // submit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const res: ResponseType = await axios.post("/users/create", data);
      setEmail("");
      setPassword("");
      setPwConfirm("");
      alert(res.data.message);
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
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
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="비밀번호 확인"
                variant="outlined"
                type="password"
                value={pwconfirm}
                onChange={onChangePwConfirm}
                error={!pwconfirmVali && pwconfirm.length ? true : false}
                helperText={
                  !pwconfirmVali && pwconfirm.length
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
            disabled={passwordVali && pwconfirmVali && emailVali ? false : true}
          >
            회원가입
          </Button>
        </FormControl>
      </Box>
    </div>
  );
};

export default SignUpForm;
