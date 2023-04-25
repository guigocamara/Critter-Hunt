import React from 'react';
import LeardBoard from '../components/LeardBoard';
import NavBar from '../components/NavBar';
import './style.css';
import ProfilePictureMaker from './ProfilePictureMaker.png'
const LeardBoard = () =>
{
    return(

      <NavBar></NavBar>
      
      <div>
        <div className="Main-container">
          <div className="container-login">
            <span className="page-title">Best Critter Hunters!</span>
            <div className="wrap-login">

              <img src={ProfilePictureMaker} className="login-pic" alt="IMG" />
              <a className="login-form">

                <Login/>



              </a>
            </div>

          </div>
        </div>
      </div>
    );
};
export default LeardBoard;
