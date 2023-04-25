import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var signUpName;
    var signUpPassword;
    var signUpPasswordConfirmation;
    var email;
    const [message, setMessage] = useState('');
    const dosignUp = async event => {
        event.preventDefault();

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email.value)) {
            setMessage('Invalid Email');
            return;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(signUpPassword.value)) {
            setMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        if (signUpPassword.value !== signUpPasswordConfirmation.value) {
            setMessage('Passwords do not match.');
            return;
        }
        var obj = { username: signUpName.value, password: signUpPassword.value, email: email.value };
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
                    setMessage('Username already taken. Please try another one!');
                }
                else {
                    storage.storeToken(res);
                    var jwt = require('jsonwebtoken');

                    var ud = jwt.decode(storage.retrieveToken(), { complete: true });
                    var username = ud.payload.username;
                    var password = ud.payload.password;
                    var email = ud.payload.email;

                    var user = { username: username, password: password, email: email }
                    localStorage.setItem('user_data', JSON.stringify(user));
                    window.location.href = '/cards';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <span className="login-form-title">Sign up</span>
            <div className="wrap-input">
                <input type="text" className="input" name="Username" id="signUpName" placeholder="Username" required ref={(c) => signUpName = c} />
                <span className="focus-input"></span>
                <span className="symbol-input"> <i className="fa fa-user" aria-hidden="true">< /i> </span>
            </div>
            <div className="wrap-input">
                <input type="password" className="input" name="pass" id="signUpPassword" placeholder="Password" required ref={(c) => signUpPassword = c} />
                <span className="focus-input"></span>
                <span className="symbol-input"> <i className="fa fa-lock" aria-hidden="true"></i> </span>
            </div>
            <div className="wrap-input">
                <input type="password" className="input" name="pass_confirmation" id="signUpPasswordConfirmation" placeholder="Confirm Password" required ref={(c) => signUpPasswordConfirmation = c} />
                <span className="focus-input"></span>
                <span className="symbol-input"> <i className="fa fa-lock" aria-hidden="true"></i> </span>
            </div>
            <div className="wrap-input">
                <input type="text" className="input" name="email" id="email" placeholder="Email Address" ref={(c) => email = c} />
            <span className="focus-input"></span>
            <span className="symbol-input"> <i className="fa fa-envelope" aria-hidden="true">< /i> </span>
          </div>
          <div className="login-form-btn-container">
            <button className="login-form-btn" onClick={dosignUp} >Sign up</button>
          </div>

        </div>

    );
};
export default Signup;