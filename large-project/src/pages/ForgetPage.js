import React from 'react';
import Forgotpassword from '../components/Forgotpassword';
import './style.css';
import PenguinPicture from './PenguinPicture.png'
const ForgetPage = () =>
{
    return(
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div className="wrap-login">

              <img src={PenguinPicture} className="login-pic" alt="IMG" />
              <a className="login-form">

              <span className="login-form-title">Forgot your password?</span>
              <span className="txt1">Enter your email and we'll send you a token to get back into your account.</span> <br />

                <Forgotpassword/>

                <div className="text-center p-t-1">
                  <span className="txt1">Have an account?</span>
                  <a href="/" className="txt2"> Login!</a>
                </div>

                <div class="text-center p-t-2">
                  <a href="/Signup" className="txt2">Need an account? Create one! <i className="fa fa-long-arrow-right " aria-hidden="true"></i></a>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
};
export default ForgetPage;
