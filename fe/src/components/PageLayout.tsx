import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const PageLayout = () => {
  return (
    <Layout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Layout>
  );
};

export default PageLayout;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  @media (min-width: 1025px) {
    width: 40vw;
  }
  margin: 0 auto;
  background-color: white;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 30px 30px;
`;
