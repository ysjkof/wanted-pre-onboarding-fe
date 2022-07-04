import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const Wrapper = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.blurBgColor};
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
`;

const Main = styled.div`
  margin-top: 20px;
`;
function Layout() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
}

export default Layout;
