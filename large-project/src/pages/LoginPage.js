import React from 'react';
import Headers from '../components/Headers';
import PageTitle from '../components/PageTitle';
import './style.css';
import Login from '../components/Login';

const LoginPage = () =>
{
    return(
      <div>
        <Headers />
        <Login/>
      </div>
    );
};
export default LoginPage;
