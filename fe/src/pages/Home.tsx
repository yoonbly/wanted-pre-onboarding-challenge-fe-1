import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
      navigate("/");
    };
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          onClick={clearStorage}
          variant="outlined"
          style={{ marginBottom: "10px" }}
        >
          로그아웃
        </Button>
        <Button onClick={() => navigate("/todolist")} variant="contained">
          TodoList보기
        </Button>
      </div>
    );
  };
  const onLog = () => {
    return (
      <div>
        <Button variant="contained" onClick={() => navigate("/auth")}>
          로그인
        </Button>
      </div>
    );
  };
  return <div>{isLogin ? outLog() : onLog()}</div>;
};

export default Home;
