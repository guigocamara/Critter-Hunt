import React from 'react';
import Resetpassword from '../components/Resetpassword';
import './style.css';
import HorsePicture from './HorsePicture.png'
const ResetPage = () =>
{
    return(
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div className="wrap-login">

              <img src={HorsePicture} className="login-pic" alt="IMG" />
              <a className="login-form">

              <span className="login-form-title">Reset your password?</span>
              <span className="txt1">Enter your token and new password!.</span> <br />

                <Resetpassword/>

                <div className="text-center p-t-1">
                  <span className="txt1">Change your mind? ?</span>
                  <a href="/" className="txt2"> Return to ogin!</a>
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
export default ResetPage;
