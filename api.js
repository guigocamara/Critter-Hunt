require('express');
require('mongodb');

const User = require("./models/user.js");
//load card model

//const Card = require("./models/card.js");

exports.setApp = function (app, client) {

  /*
  app.post('/api/addcard', async (req, res, next) =>
  {
    // incoming: userId, color
    // outgoing: error

    let token = require('./createJWT.js');
    const { userId, card, jwtToken } = req.body;

    


    try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
    }
    catch(e)
    {
      console.log(e.message);
    }

    //const newCard = { Card: card, UserId: userId };
    const newCard = new Card({ Card: card, UserId: userId });
    var error = '';
    try 
    {
      // const db = client.db();
      // const result = db.collection('Cards').insertOne(newCard);
      newCard.save();
    }
      catch (e) 
    {
      error = e.toString();
    }
    cardList.push( card );

    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var ret = { error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });
  */



  /* our old api for login from main
  app.post('/api/login', async (req, res, next) => 
  {
    // incoming: username, password
    // outgoing: username, password, favorite, error
    var error = '';
    console.log(req.body);
    const { username, password } = req.body;
    const db = client.db("CritterHunt");
    const results = await db.collection('Users').find({username:username,password:password}).toArray();
    var id = '';
    var fn = '';
    var ln = '';
    
    if( results.length > 0 )
    {
      id = results[0].username;
      fn = results[0].password;
      ln = results[0].favorite;
    }
    var ret = { username:id, password:fn, favorite:ln, error:''};
    res.status(200).json(ret);
  });
  */

  //new login api
  app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: username, password, favorite, error

    var error = '';

    const { username, password } = req.body;

    //const db = client.db();
    //const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();
    const results = await User.find({ username: username, password: password });

    var us = '';
    var pa = '';
    var fa = '';
    var ret;

    if (results.length > 0) {
      us = results[0].username;
      pa = results[0].password;
      fa = results[0].favorite;
      try {
        const token = require("./createJWT.js");
        ret = token.createToken(us, pa, fa);
      }
      catch (e) {
        ret = { error: e.message };
      }
    }
    else {
      ret = { error: "Login/Password incorrect" };
    }

    res.status(200).json(ret);
  });





  /*
  app.post('/api/searchcards', async (req, res, next) => 
  {
    // incoming: userId, search
    // outgoing: results[], error
  
    var error = '';
  
    const { userId, search, jwtToken } = req.body;
    try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var _search = search.trim();
    
    const db = client.db();
    //const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
    const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
    
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push( results[i].Card );
    }
    
    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
  
    var ret = { results:_ret, error: error, jwtToken: refreshedToken };
    
    res.status(200).json(ret);
  });
  */
}