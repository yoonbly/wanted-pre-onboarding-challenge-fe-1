import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { FormBox } from "../styles/pageStyles";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);

  const navigate = useNavigate();

  return (
    <FormBox>
      <HomeText>{isLogin ? `Hi👋, Todo App` : `Welcome🙌, Todo App`}</HomeText>
      <div>
        {isLogin ? (
          <Button
            onClick={() => navigate("/todolist")}
            size="large"
            variant="contained"
          >
            TodoList 보기
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            size="large"
            variant="contained"
          >
            로그인하기
          </Button>
        )}
      </div>
    </FormBox>
  );
};

export default Home;

const HomeText = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 40px;
  animation: slideInFromBottom 1s ease-in-out;
  @keyframes slideInFromBottom {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
    }
  }
`;
