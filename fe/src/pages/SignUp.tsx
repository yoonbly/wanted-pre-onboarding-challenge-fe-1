import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../auth/SignUpForm";

const SignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignUpForm />
      <Link to="/auth">로그인</Link>
    </div>
  );
};

export default SignUp;
