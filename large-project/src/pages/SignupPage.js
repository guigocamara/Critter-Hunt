import React from 'react';
import Headers from '../components/Headers';
import PageTitle from '../components/PageTitle';
import './style.css';
import Signup from '../components/Signup';

const SignupPage = () =>
{
    return(
      <div>
        <Headers />
        <Signup />
      </div>
    );
};
export default SignupPage;
