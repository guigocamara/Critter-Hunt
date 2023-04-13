import React, { useState } from 'react';
import axios from 'axios';

function Forgotpassword() {
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var email;
    const [message, setMessage] = useState('');
    const doForgotpassword = async event => {
        event.preventDefault();
        var obj = { email: email.value };
        var js = JSON.stringify(obj);
        var config =
        {
            method: 'post',
            url: bp.buildPath('api/forgotpassword'),
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
                    setMessage('Email does not exist');
                }
                else {

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (

          <div>
            <div className="wrap-input">
              <input type="text" className="input" name="email" id="email" placeholder="Email address" required ref={(c) => email = c} />
              <span className="focus-input"></span>
              <span className="symbol-input"> <i className="fa fa-envelope" aria-hidden="true">< /i> </span>
            </div>

          <div className="login-form-btn-container">
            <button className="login-form-btn" onClick={doForgotpassword} >Send Token</button>
          </div>

          <span id="forgotResult">{message}</span>

        </div>

    );
};
export default Forgot;
