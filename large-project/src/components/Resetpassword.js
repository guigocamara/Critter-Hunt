import React, { useState } from 'react';
import axios from 'axios';

function Resetpassword() {
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var email;
    var password;
    var passwordConfirmation;
    const [message, setMessage] = useState('');
    const doResetpassword = async event => {
        event.preventDefault();


        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password.value)) {
            setMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        if (passwordConfirmation.value !== passwordConfirmation.value) {
            setMessage('Passwords do not match.');
            return;
        }

        var obj = { email: email.value, password: password.value, passwordConfirmation: passwordConfirmation.value};
        var js = JSON.stringify(obj);
        var config =
        {
            method: 'post',
            url: bp.buildPath('api/resetpassword'),
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
                    setMessage('Incorrect token');
                }
                else {
                    setMessage('Password changed sucessfully!');
                    storage.storeToken(res);
                    var jwt = require('jsonwebtoken');
                    window.location.href = '/';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (

          <div>
            <div className="wrap-input">
              <input type="text" className="input" name="token" id="token" placeholder="Token" required ref={(c) => email = c} />
              <span className="focus-input"></span>
              <span className="symbol-input"> <i className="fa fa-safari" aria-hidden="true">< /i> </span>
            </div>

            <div className="wrap-input">
              <input type="text" className="input" name="password" id="password" placeholder="New password" required ref={(c) => password = c} />
              <span className="focus-input"></span>
              <span className="symbol-input"> <i className="fa fa-lock" aria-hidden="true">< /i> </span>
            </div>

            <div className="wrap-input">
              <input type="text" className="input" name="password" id="passwordConfirmation" placeholder="Confirm password" required ref={(c) => password = c} />
              <span className="focus-input"></span>
              <span className="symbol-input"> <i className="fa fa-lock" aria-hidden="true">< /i> </span>
            </div>

          <div className="login-form-btn-container">
            <button className="login-form-btn" onClick={doResetpassword} >Reset passwoord</button>
          </div>

          <span id="resetResult">{message}</span>

        </div>

    );
};
export default Resetpassword;
