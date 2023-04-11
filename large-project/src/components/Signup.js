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


        <div>
          <span className="login-form-title">Sign up</span>
          <div className="wrap-input">
            <input type="text" className="input" name="Username" id="signUpName" placeholder="Username" required ref={(c) => signUpName = c} /><br/>
            <span className="focus-input"></span>
            <span className="symbol-input"> <i className="fa fa-user" aria-hidden="true">< /i> </span>
          </div>

          


          <div className="wrap-input">
            <input type="password" className="input" name="pass" id="signUpPassword" placeholder="Password" required ref={(c) => loginPassword = c} /><br />
            <span className="focus-input"></span>
            <span className="symbol-input"> <i className="fa fa-lock" aria-hidden="true"></i> </span>
          </div>

          <div className="wrap-input">
            <input type="text" className="input" name="favoriteAnimal" id="favoriteAnimal" placeholder="Favorite Critter " ref={(c) => favoriteAnimal = c} /><br/>
            <span className="focus-input"></span>
            <span className="symbol-input"> <i className="fa fa-github-alt" aria-hidden="true">< /i> </span>
          </div>


        <div className="login-form-btn-container">
          <button className="login-form-btn" onClick={dosignUp} >Sign up</button>
        </div>
      </div>



    );
};
export default Signup;
