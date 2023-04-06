import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Headers from '../components/Headers';
const LoginPage = () =>
{
    return(

      <div>
        <Headers />
        <PageTitle />
        <Login/>
        <Signup />
      </div>
    );
};
export default LoginPage;

