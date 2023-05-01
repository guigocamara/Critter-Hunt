import React, { useState } from 'react';
import axios from 'axios';

function EmailVerification(props) {
  var bp = require('./Path.js');
  var storage = require('../tokenStorage.js');
  var emailToken;
  const [message, setMessage] = useState('');

  const doVerification = async () => {
    const userDataString = localStorage.getItem('EMAIL');
    const userData = JSON.parse(userDataString);
    const userEmail = userData.email;
    console.log(userEmail);
      try {
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: userEmail, verificationCode: emailToken.value })

          };
          await fetch('http://critterhunt.herokuapp.com/api/verifyEmail', requestOptions)
              .then(response => {
                  if (response.ok) {
                      setMessage('Your email was successfully verified!');
                  } else {
                      setMessage('Invalid verification code');
                  }
              })
      }
      catch (error) {
          console.error(error);
      }
  }

  const goToLogin = () => {
      window.location.href = '/';
  }
  return (
    <div>
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
