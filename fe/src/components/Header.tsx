import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logoutAccout } from "../redux/userSlice";
import IconButton from "@mui/material/IconButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

const Header = () => {
  const navigate = useNavigate();

  const isLogin = useAppSelector((state) => state.user.isLogin);
  const dispatch = useAppDispatch();

  const clearStorage = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    dispatch(logoutAccout());
    navigate("/");
  };
  return (
    <MyHeader>
      <IconButton onClick={() => navigate("/")}>
        <HomeRoundedIcon sx={{ color: "white", fontSize: "2rem" }} />
      </IconButton>
      {isLogin ? (
        <IconButton onClick={clearStorage}>
          <LogoutRoundedIcon sx={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
      ) : (
        <IconButton onClick={() => navigate("/auth/login")}>
          <LoginRoundedIcon sx={{ color: "white", fontSize: "2rem" }} />
        </IconButton>
      )}
    </MyHeader>
  );
};

export default Header;

const MyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  padding: 0% 5% 0% 5%;
  background-color: #1565c0;
`;
