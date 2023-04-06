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
        <div className="Main-container"> 
          <div className="container-login"> 
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div className="wrap-login">
              <div className="login-pic"><img src="ProfilePictureMaker.png" alt="IMG"> </img>
              <a className="login-form">
                <span className="login-form-title">Login</span>
                <Login/>
                <div className="text-center p-t-1">
                  <span className="txt1">Forgot</span>
                  <a className="txt2"> Username / Password ?</a>
                </div>
                <div className="text-center p-t-2">
                  <a className="txt2">Create Your Account <i className="fa fa-long-arrow-right " aria-hidden="true"></i></a>
                </div>
              </a>
            </div>
          </div>
        </div>
        <Signup />
      </div>
    );
};
export default LoginPage;

