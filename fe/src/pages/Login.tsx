import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { FormBox } from "../styles/pageStyles";

const Login = () => {
  return (
    <FormBox>
      <LoginForm />
      <Link to="/auth/signup">회원가입</Link>
    </FormBox>
  );
};

export default Login;
