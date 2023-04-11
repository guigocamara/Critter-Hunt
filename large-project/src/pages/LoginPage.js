import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import Signup from '../components/Signup';
import './style.css';
const LoginPage = () =>
{
    return(
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Hunt Critter with Critter Hunt!</span>
            <div class="wrap-login">
              <a class="login-form">
                <Login/>


                <div class="text-center p-t-1">
                  <span class="txt1">Forgot</span>
                  <a href="#" class="txt2"> Username / Password ?</a>
                </div>

                <div class="text-center p-t-2">
                  <a href="/Signup" class="txt2">Create Your Account <i class="fa fa-long-arrow-right " aria-hidden="true"></i></a>
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
