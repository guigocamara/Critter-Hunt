import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CardPage from './pages/CardPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/Signup" index element={<SignupPage />} />
      <Route path="/cards" index element={<CardPage />} />

    </Routes>
  </BrowserRouter>
);
}
export default App;
