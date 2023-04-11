import React from 'react';
import Signup from '../components/Signup';
import './style.css';
import SnakePicture from './SnakePicture.png'
const SignupPage = () =>
{
    return(
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div className="wrap-login">

              <img src={ProfilePictureMaker} className="login-pic" alt="IMG" />
              <a className="login-form">

                <Signup/>


                <div class="text-center p-t-2">
                  <a href="/" className="txt2">Have an Account? Go login <i className="fa fa-long-arrow-right " aria-hidden="true"></i></a>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
};
export default SignupPage;
