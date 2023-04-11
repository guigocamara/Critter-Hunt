import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Signup from '../components/Signup';
import './style.css';
const LoginPage = () =>
{
    return(
      <div>
        <span className="page-title">Hunt Critter with Critter Hunt!</span>
        <Login/>
        <Signup />
      </div>
    );
};
export default LoginPage;
