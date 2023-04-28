import React, { useState } from 'react';
import axios from 'axios';

function EmailVerification() {
  var bp = require('./Path.js');
  var storage = require('../tokenStorage.js');
  var emailToken;
  const [message, setMessage] = useState('');

  const doVerification = async event => {
    event.preventDefault();
    var email = localStorage.getItem('email')
    var obj = {email: email, emailToken: emailToken.value };
    var js = JSON.stringify(obj);
    var config = {
      method: 'post',
      url: bp.buildPath('api/verifyEmail'),
      headers: {
        'Content-Type': 'application/json'
      },
      data: js
    };
    axios(config)
      .then(function (response) {
        var res = response.data;
        if (res.error) {
          console.log(res.error);
          setMessage('Email verification failed');
        } else {
          setMessage('Email verification succeeded');
          window.location.href = '/';
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <span className="login-form-title">Email Verification</span>
      <div className="wrap-input">
        <input type="email" className="input" name="email" id="emailToken" placeholder="Verification Token" required ref={(c) => emailToken = c} />
        <span className="focus-input"></span>
        <span className="symbol-input"> <i className="fa fa-envelope" aria-hidden="true"></i> </span>
      </div>

      <div className="login-form-btn-container">
        <button className="login-form-btn" onClick={doVerification} >Verify Email</button>
      </div>

      <span id="emailVerificationResult">{message}</span>
    </div>
  );
}

export default EmailVerification;
