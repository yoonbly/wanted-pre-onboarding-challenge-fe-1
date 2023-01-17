import { Link } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

const Footer = () => {
  return (
    <MyFooter>
      <Link
        href="https://surgedev.notion.site/1-940b36989e8f411fa57c09f6cb69479b"
        underline="hover"
        color={"white"}
        target="_blank"
      >
        제작기 보러가기 👀
      </Link>
    </MyFooter>
  );
};

export default Footer;

const MyFooter = styled.div`
  background-color: #1565c0;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
