import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CardPage from './pages/CardPage';
function App() {
  return (


    useScript("https://kit.fontawesome.com/e48d166edc.js");
    
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
