import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { FormBox } from "../styles/pageStyles";

const SignUp = () => {
  return (
    <FormBox>
      <SignUpForm />
      <Link to="/auth/login">로그인</Link>
    </FormBox>
  );
};

export default SignUp;
