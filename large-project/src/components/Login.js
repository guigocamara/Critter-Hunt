import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');
    const doLogin = async event => {
        event.preventDefault();
        var obj = { username: loginName.value, password: loginPassword.value };
        var js = JSON.stringify(obj);
        var config =
        {
            method: 'post',
            url: bp.buildPath('api/login'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then(function (response) {
                var res = response.data;
                if (res.error) {
                    console.log(res.error);
                    setMessage('User/Password combination incorrect');
                }
                else {
                    storage.storeToken(res);
                    var jwt = require('jsonwebtoken');

                    var ud = jwt.decode(storage.retrieveToken(), { complete: true });
                    var username = ud.payload.username;
                    var password = ud.payload.password;
                    var favorite = ud.payload.favorite;

                    var user = { username: username, password: password, favorite: favorite }
                    localStorage.setItem('user_data', JSON.stringify(user));
                    window.location.href = '/cards';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (

    <meta charset="UTF-8"> </meta>
    <>...</>? <meta http-equiv="X-UA-Compatible" content="IE=edge"> </meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> </meta>
    <script src="https://kit.fontawesome.com/e48d166edc.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css"> </link>
    <title>Critter Hunt Login</title>

          <div className="Main-container">
              <div className="container-login">
                <span className="page-title">Hunt Critter with Critter Hunt!</span>
                  <div className="wrap-login">
                      <div className="login-pic">
                          <img src="ProfilePictureMaker.png" alt="IMG"> </img>
                      </div>

                      <a className="login-form">
                          <span className="login-form-title">Login</span>

                          <div className="wrap-input">
                              <input type="text" className="input" id="loginName" name="Username" placeholder="Username" required>
                              <span className="focus-input"></span>
                              <span className="symbol-input">
                                  <i className="fa fa-user" aria-hidden="true"></i>
                              </span> </input>
                          </div>
                          <div className="wrap-input">
                              <input type="password" className="input" id="loginPassword" name="pass" placeholder="Password" required>
                              <span className="focus-input"></span>
                              <span className="symbol-input">
                                  <i className="fa fa-lock" aria-hidden="true"></i>
                              </span> </input>
                          </div>

                          <div className="login-form-btn-container">
                              <button className="login-form-btn"  onClick={doLogin} >Login</button>
                          </div>

                          <span id="loginResult">{message}</span>

                        <div className="text-center p-t-1">
                            <span className="txt1">Forgot</span>
                            <a href="#" className="txt2"> Username / Password ?</a>
                        </div>
                        <div className="text-center p-t-2">
                            <a href="/Signup" className="txt2">Create Your Account <i className="fa fa-long-arrow-right " aria-hidden="true"></i></a>
                        </div>

                      </a>

                  </div>
              </div>
          </div>



    );
};
export default Login;
