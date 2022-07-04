import React from 'react';
import { LOGIN_KEY } from '../const';

const defaultContext = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};
const AuthContext = React.createContext(defaultContext);

export const getUsers = () => JSON.parse(localStorage.getItem(LOGIN_KEY));
export const getLoginUser = () => {
  const users = getUsers();
  const loginUser = users?.find((user) => user.isLogin);
  return loginUser;
};

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(getLoginUser());

  const login = (loginInfo) => {
    localStorage.setItem(LOGIN_KEY, JSON.stringify(loginInfo));
    setIsLoggedIn(true);
  };

  const logout = () => {
    const users = getUsers();
    const loginIdx = users?.findIndex((user) => user.isLogin);
    users[loginIdx].isLogin = false;
    localStorage.setItem(LOGIN_KEY, JSON.stringify(users));
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
  return React.useContext(AuthContext);
};

export { AuthContextProvider, AuthContext };
