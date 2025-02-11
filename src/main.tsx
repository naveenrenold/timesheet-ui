import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login/Login.tsx';
import Header from './components/Header/header.tsx';
import Home from './components/Home/home.tsx';
import FillAttendance from './components/FillAttendance/FillAttendance.tsx';

import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("employee") !== null);

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(sessionStorage.getItem("employee") !== null);
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("employee");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Header onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fill-attendance" element={<FillAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
