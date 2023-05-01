import React from 'react';
import Login from '../components/Login';
import './style.css';
import ProfilePictureMaker from './ProfilePictureMaker.png'
const LoginPage = () =>
{
    return(
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div className="wrap-login">

              <img src={ProfilePictureMaker} className="login-pic" alt="IMG" />
              <a href= "/" className="login-form">

                <Login/>


                <div className="text-center p-t-1">
                  <a href="/ForgetPage" className="txt2"> Forgot your username or password?</a>
                </div>
                <div className="text-center p-t-1">
                  <a href="/VerifyEmailPage" className="txt2"> Need to verify your email?</a>
                </div>

                <div class="text-center p-t-2">
                  <a href="/SignUp" className="txt2">Create Your Account <i className="fa fa-long-arrow-right " aria-hidden="true"></i></a>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
};
export default LoginPage;
