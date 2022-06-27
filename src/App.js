import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NavigationBar from './pages/NavigationBar';
import './App.css';
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div className="App">
      <NavigationBar />
      <MainPage />
    </div>
  );
}

export default App;
