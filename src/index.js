import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import LoginPage from './pages/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';
import GlobalStyles from './styles/globalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="main" element={<ProtectedRoutes />} />
        <Route path="*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
