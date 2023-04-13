import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgetPage from './pages/ForgetPage';
import CardPage from './pages/CardPage';
import MapsPage from './pages/MapsPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/Signup" index element={<SignupPage />} />
      <Route path="/ForgetPage" index element={<ForgetPage />} />
      <Route path="/cards" index element={<CardPage />} />
      <Route path="/map" index element={<MapsPage />} />
    </Routes>
  </BrowserRouter>
);
}
export default App;
