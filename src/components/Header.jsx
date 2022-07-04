import {
  faCompass,
  faHeart,
  faPaperPlane,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHouse, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { useAuthState } from '../context/AuthContext';

const Nav = styled.nav`
  top: 0px;
  width: 100%;
  position: sticky;
  border-bottom: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.bgColor};
`;
const Wrapper = styled.div`
  padding: 4px 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  width: 100%;
  font-size: 24px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${(props) => props.theme.logoColor};
`;
const Search = styled.div`
  @media only screen and (max-width: 640px) {
    display: none;
  }
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  input {
    border-radius: 5px;
    background-color: ${(props) => props.theme.blurBgColor};
    padding: 4px 4px 4px 32px;
    width: 180px;
  }
  svg {
    position: absolute;
    left: 10px;
    scale: 0.7;
  }
`;
const ButtonList = styled.div`
  width: 100%;
  max-width: 300px;
  margin-left: 40px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  button {
    border: 1px solid;
    border-radius: 5px;
    background-color: transparent;
  }
`;

function Header() {
  const { logout } = useAuthState();

  const onClickLogout = () => logout();

  return (
    <Nav>
      <Wrapper>
        <Title>
          <span>Instagram</span>
        </Title>
        <Search>
          <input type={'search'} placeholder="검색" />
          <FontAwesomeIcon icon={faSearch} />
        </Search>

        <ButtonList>
          <FontAwesomeIcon icon={faHouse} />
          <FontAwesomeIcon icon={faPaperPlane} />
          <FontAwesomeIcon icon={faPlusSquare} />
          <FontAwesomeIcon icon={faCompass} />
          <FontAwesomeIcon icon={faHeart} />
          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </ButtonList>
      </Wrapper>
    </Nav>
  );
}

export default Header;
