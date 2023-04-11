import React from 'react';
import Login from '../components/Login';
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

              <span className="login-form-title">Did you forget your password?</span>
              <span className="login-form-title">Enter your email</span>
              <div className="wrap-input">
                <input type="text" className="input" name="Email" id="Email" placeholder="Email" required ref={(c) => Email = c} /><br/>
                <span className="focus-input"></span>
                <span className="symbol-input"> <i className="fa fa-envelope" aria-hidden="true">< /i> </span>
              </div>


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
