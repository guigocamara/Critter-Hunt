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

      <head>
    <meta charset="UTF-8"> </meta>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> </meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> </meta>
    <script src="https://kit.fontawesome.com/e48d166edc.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css"> </link>
    <title>Critter Hunt Login</title>
</head>

      <body>
          <div class="Main-container">
              <div class="container-login">
                <span class="page-title">Hunt Critter with Critter Hunt!</span>
                  <div class="wrap-login">
                      <div class="login-pic">
                          <img src="ProfilePictureMaker.png" alt="IMG"> </img>
                      </div>

                      <a class="login-form">
                          <span class="login-form-title">Login</span>

                          <div class="wrap-input">
                              <input type="text" class="input" id="loginName" name="Username" placeholder="Username" required>
                              <span class="focus-input"></span>
                              <span class="symbol-input">
                                  <i class="fa fa-user" aria-hidden="true"></i>
                              </span> </input>
                          </div>
                          <div class="wrap-input">
                              <input type="password" class="input" id="loginPassword" name="pass" placeholder="Password" required>
                              <span class="focus-input"></span>
                              <span class="symbol-input">
                                  <i class="fa fa-lock" aria-hidden="true"></i>
                              </span> </input>
                          </div>

                          <div class="login-form-btn-container">
                              <button class="login-form-btn"  onClick={doLogin} >Login</button>
                          </div>

                          <span id="loginResult">{message}</span>

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

      </body>


    );
};
export default Login;
