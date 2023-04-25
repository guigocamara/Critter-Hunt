import React from 'react';
import EmailVerification from '../components/EmailVerification';
import './style.css';
import ProfilePictureMaker from './ProfilePictureMaker.png'
const VerifyEmailPage = () =>
{
    return(
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div className="wrap-login">

              <img src={ProfilePictureMaker} className="login-pic" alt="IMG" />
              <a className="login-form">

              <span className="login-form-title">Verify you email</span>
              <span className="txt1">Enter the code that was emailed to you to get verified.</span> <br />

                <EmailVerification/>

              </a>
            </div>

          </div>
        </div>
      </div>
    );
};
export default VerifyEmailPage;
