import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Layout from './components/Layout';
import { useAuthState } from './context/AuthContext';

function App() {
  const { isLoggedIn } = useAuthState();

  return (
    <Routes>
      {isLoggedIn && (
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
      )}
      {!isLoggedIn && <Route path="/" element={<Login />} />}
      <Route path="*" element={<p>없는 페이지입니다</p>} />
    </Routes>
  );
}

export default App;
