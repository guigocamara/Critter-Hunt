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
                    window.location.href = '/map';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
            <div id="loginDiv" className="bg-green-200 flex-row text-center h-50 ml-10 mr-10">
            
                <div className="text-xl">
                    <span className="" id="inner-title">PLEASE LOG IN</span><br />
                    <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br
                    />
                    <input type="password" id="loginPassword" placeholder="Password" ref={(c) =>
                        loginPassword = c} /><br />
                    <input type="submit" id="loginButton" value="Do It"
                        onClick={doLogin} />
                    <span id="loginResult">{message}</span>
                </div>
            </div>


    );
};
export default Login;
