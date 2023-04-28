import React from 'react';
import EmailVerification from '../components/EmailVerification';
import './style.css';
import SharkPicture from './SharkPicture.png'
const VerifyEmailPage = () =>
{
    return(
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div className="wrap-login">

              <img src={SharkPicture} className="login-pic" alt="IMG" />
              <a className="login-form">

              <span className="login-form-title">Final step!</span>
              <span className="login-form-title">We need to verify your email!</span>
              <span className="txt1">Please check your inbox for your verification code and enter it below.</span> <br />

                <EmailVerification/>

              </a>
            </div>

          </div>
        </div>
      </div>
    );
};
export default VerifyEmailPage;
