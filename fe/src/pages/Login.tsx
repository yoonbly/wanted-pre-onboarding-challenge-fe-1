import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
      <Link to="/auth/signup">회원가입</Link>
    </div>
  );
};

export default Login;
