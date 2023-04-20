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
                  <span className="txt1">Forgot</span>
                  <a href="/" className="txt2"> Username / Password ?</a>
                </div>

                <div class="text-center p-t-2">
                  <a href="/" className="txt2">Create Your Account <i className="fa fa-long-arrow-right " aria-hidden="true"></i></a>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
};
export default LoginPage;
