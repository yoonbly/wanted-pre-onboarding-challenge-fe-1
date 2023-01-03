import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "../types/auth";

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
  const onChangePwConfirm = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Sign up</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          이메일
          <input
            type="email"
            id="email"
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
          />
        </label>
        {!emailVali && email.length ? (
          <span>이메일 형식이 아닙니다.</span>
        ) : null}
        <label htmlFor="password">
          비밀번호
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          />
        </label>
        {!passwordVali && password.length ? (
          <span>비밀번호는 숫자, 영문자를 포함한 8글자 이상이어야 합니다.</span>
        ) : null}
        <label htmlFor="passwordConfirm">
          비밀번호 확인
          <input
            type="password"
            id="passwordConfirm"
            placeholder="비밀번호 확인"
            value={pwconfirm}
            onChange={onChangePwConfirm}
          />
        </label>
        {!pwconfirmVali && pwconfirm.length ? (
          <span>비밀번호가 일치하지 않습니다.</span>
        ) : null}
        <button
          disabled={passwordVali && pwconfirmVali && emailVali ? false : true}
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
