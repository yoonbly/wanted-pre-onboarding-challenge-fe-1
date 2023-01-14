import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormBox, HomeText } from "../styles/pageStyles";

const Home = () => {
  // 전역상태로 관리해주기
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  const outLog = () => {
    const clearStorage = () => {
      localStorage.clear();
      alert("로그아웃 되었습니다.");
      setIsLogin(false);
    };
    return (
      <FormBox>
        <Button onClick={clearStorage} variant="outlined">
          로그아웃
        </Button>
        <Button onClick={() => navigate("/todolist")} variant="contained">
          TodoList보기
        </Button>
      </FormBox>
    );
  };
  const onLog = () => {
    return (
      <div>
        <Button variant="contained" onClick={() => navigate("/auth/login")}>
          로그인
        </Button>
      </div>
    );
  };
  return (
    <FormBox>
      <HomeText>Welcome, Todo App</HomeText>
      <div>{isLogin ? outLog() : onLog()}</div>
    </FormBox>
  );
};

export default Home;
