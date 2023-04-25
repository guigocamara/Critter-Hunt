import React, { useState } from 'react';
import axios from 'axios';

function EmailVerification() {
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');
    const doVerification = async event => {
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
                    window.location.href = '/map';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (

          <div>
            <span className="login-form-title">Login</span>
            <div className="wrap-input">
              <input type="text" className="input" name="Username" id="loginName" placeholder="Username" required ref={(c) => loginName = c} />
              <span className="focus-input"></span>
              <span className="symbol-input"> <i className="fa fa-user" aria-hidden="true"></i> </span>
            </div>


            <div className="wrap-input">
              <input type="password" className="input" name="pass" id="loginPassword" placeholder="Password" required ref={(c) => loginPassword = c} />
              <span className="focus-input"></span>
              <span className="symbol-input"> <i className="fa fa-lock" aria-hidden="true"></i> </span>
            </div>

          <div className="login-form-btn-container">
            <button className="login-form-btn" onClick={doLogin} >Login</button>
          </div>

          <span id="loginResult">{message}</span>

        </div>

    );
};
export default EmailVerification;
