import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var signUpName;
    var signUpPassword;
    var favoriteAnimal;
    const [message, setMessage] = useState('');
    const dosignUp = async event => {
        event.preventDefault();
        var obj = { username: signUpName.value, password: signUpPassword.value, favorite: favoriteAnimal.value };
        var js = JSON.stringify(obj);
        var config =
        {
            method: 'post',
            url: bp.buildPath('api/signUp'),
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
                    setMessage('usernmane already take. Please try another one!');
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
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://kit.fontawesome.com/e48d166edc.js" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="style.css"> </link>
      <title>Critter Hunt Signup</title>
     </head>

    <body>
    <div class="Main-container">
        <div class="container-login">
          <span class="page-title">Hunt Critter with Critter Hunt!</span>
            <div class="wrap-login">
                <div class="login-pic">
                    <img src="ProfilePictureMaker.png" alt="IMG"> </img>
                </div>

                <form class="login-form">
                    <span class="login-form-title">Sign up</span>

                    <div class="wrap-input">
                        <input type="text" class="input" name="Username" id="signUpPassword" placeholder="Username" required>
                        <span class="focus-input"></span>
                        <span class="symbol-input">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </span> </input>
                    </div>
                    <div class="wrap-input">
                        <input type="text" class="input" name="Email" placeholder="Email" required>
                        <span class="focus-input"></span>
                        <span class="symbol-input">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span> </input>
                    </div>

                    <div class="wrap-input">
                        <input type="password" class="input" name="pass" id="signUpPassword" placeholder="Password" required>
                        <span class="focus-input"></span>
                        <span class="symbol-input">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>  </input>
                    </div>
                    <div class="wrap-input">
                        <input type="text" class="input" name="favoriteAnimal" id="favoriteAnimal" placeholder="Favorite critter" required>
                        <span class="focus-input"></span>
                        <span class="symbol-input">
                            <i class="fa fa-github-alt" aria-hidden="true"></i>
                        </span> </input>
                    </div>

                    <div class="login-form-btn-container">
                        <button class="login-form-btn">Sign up!</button>
                    </div>

                    <span id="signUpResult">{message}</span>
                  <div class="text-center p-t-2">
                      <a href="#/" class="txt2">Have an Account? Go login <i class="fa fa-long-arrow-right " aria-hidden="true"></i></a>
                  </div>

                </form>

            </div>
        </div>
    </div>

</body>


    );
};
export default Signup;
