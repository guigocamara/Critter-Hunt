import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgetPage from './pages/ForgetPage';
import HomePage from './pages/HomePage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import LeardBoard from './pages/LeardBoard';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/Signup" index element={<SignupPage />} />
      <Route path="/ForgetPage" index element={<ForgetPage />} />
      <Route path="/map" index element={<HomePage />} />
      <Route path="/VerifyEmailPage" index element={<VerifyEmailPage />} />
      <Route path="/LeardBoard" index element={<LeardBoard />} />
    </Routes>
  </BrowserRouter>
);
}
export default App;
