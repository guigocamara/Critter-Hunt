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

          <span class="login-form-title">Login</span>
          <div class="wrap-input">
            <input type="text" className="input" name="Username" id="loginName" placeholder="Username" required ref={(c) => loginName = c} /><br/>
            <span class="focus-input"></span>
            <span class="symbol-input"> <i class="fa fa-user" aria-hidden="true"></i> </span>
          </div>


          <div class="wrap-input">
            <input type="password" className="input" name="pass" id="loginPassword" placeholder="Password" required ref={(c) => loginPassword = c} /><br />
            <span class="focus-input"></span>
            <span class="symbol-input"> <i class="fa fa-lock" aria-hidden="true"></i> </span>
          </div>

        <div class="login-form-btn-container">
          <button class="login-form-btn" onClick={doLogin} >Login</button>
        </div>

    );
};
export default Login;
