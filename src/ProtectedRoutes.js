import React, { useState } from 'react';
import App from './App';
import LoginPage from './pages/LoginPage';

function ProtectedRoutes() {
  return localStorage.loggedInUser ? <App /> : <LoginPage />;
}

export default ProtectedRoutes;
