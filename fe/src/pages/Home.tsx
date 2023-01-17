import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormBox, HomeText } from "../styles/pageStyles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logoutAccout } from "../redux/userSlice";

const Home = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const userEmail = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const outLog = () => {
    const clearStorage = () => {
      localStorage.clear();
      alert("로그아웃 되었습니다.");
      dispatch(logoutAccout());
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
      <HomeText>
        {isLogin ? `Welcome, ${userEmail}` : `Welcome, Todo App`}
      </HomeText>
      <div>{isLogin ? outLog() : onLog()}</div>
    </FormBox>
  );
};

export default Home;
