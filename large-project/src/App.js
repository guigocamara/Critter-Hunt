import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgetPage from './pages/ForgetPage';
import ResetPage from './pages/ResetPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import Leaderboard from './pages/Leaderboard';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/Signup" index element={<SignupPage />} />
      <Route path="/ForgetPage" index element={<ForgetPage />} />
      <Route path="/ResetPage" index element={<ResetPage />} />
      <Route path="/map" index element={<HomePage />} />
      <Route path="/profile" index element={<ProfilePage />} />
      <Route path="/VerifyEmailPage" index element={<VerifyEmailPage />} />
      <Route path="/Leaderboard" index element={<Leaderboard />} />
    </Routes>
  </BrowserRouter>
);
}
export default App;
