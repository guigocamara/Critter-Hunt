require('express');
require('mongodb');

const User = require("./models/user.js");
//load card model

//const Card = require("./models/card.js");
const Post = require("./models/post.js");

exports.setApp = function (app, client) {


  /*COMMENTS
    For now we are leaving out some of the calls to the jwtTokens in the api calls. This needs to be reimplemented once combined witht the frontend!
  */





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


  app.post('/api/signUp', async (req, res, next) => {

    var error = '';

    const { username, password, favorite } = req.body;

    const existingUser = await User.findOne({ username });

    if(existingUser)
    {
      return res.status(400).json({message: 'usernmane already take. Please try another one!'});
    }

    else
    {
      const newUser = new User({username: username, password: password, favorite: favorite});
      try
      {    
        await newUser.save();
        const token = require('./createJWT.js');
        const ret = token.createToken(username, password, favorite);
        res.status(200).json(ret);
      }
      catch (e)
      {
        ret = { error: e.message };
      }
    }
  });















  app.post('/api/addpost', async (req, res, next) =>
  {

    let token = require('./createJWT.js');
    const { critterid, crittername, author, likes, comments, location, picture, jwtToken } = req.body;
    //Try catch block is to make sure user is logged in.
    //try
     // {
        // if( token.isExpired(jwtToken))
        // {
        //   var r = {error:'The JWT is no longer valid', jwtToken: ''};
        //   res.status(200).json(r);
        //   return;
        // }
  //  }
    // catch(e)
    // {
    //   console.log(e.message);
    // }

    const newPost = new Post({  critterid: critterid, crittername: crittername, author: author, likes: likes, comments: comments, location: location, picture: picture });
    var error = '';
    try 
    {
      newPost.save();
      //Temporary retruning code for the newpost
      var ret = { newPost };
      res.status(200).json(ret);
    }
      catch (e) 
    {
      error = e.toString();
    }
    //This needs to be changed (effects frontend). For cards this was just a list of strings being displayed on the frontend.
   // cardList.push( crittername );

    // This try catch block still has to do with logged in user.
    // var refreshedToken = null;
    // try
    // {
    //   refreshedToken = token.refresh(jwtToken);
    // }
    // catch(e)
    // {
    //   console.log(e.message);
    // }
    
    //var ret = { error: error, jwtToken: refreshedToken };
    //res.status(200).json(ret);
  });







  
  app.delete('/api/deletepost', async (req, res, next) => 
  {
        //Try catch block is to make sure user is logged in.
    //try
     // {
        // if( token.isExpired(jwtToken))
        // {
        //   var r = {error:'The JWT is no longer valid', jwtToken: ''};
        //   res.status(200).json(r);
        //   return;
        // }
  //  }
    // catch(e)
    // {
    //   console.log(e.message);
    // }

    const { postsId } = req.body;
    try 
    {
      const deletedPost = await Post.findByIdAndDelete(postsId);

      if (!deletedPost) 
      {
        return res.status(400).json({ message: "no post found" });
      }
      res.status(200).json({ message: "Post deleted." });
    } 
    catch (e)
    {
      ret = { error: e.message };
    }

    // This try catch block still has to do with logged in user.
    // var refreshedToken = null;
    // try
    // {
    //   refreshedToken = token.refresh(jwtToken);
    // }
    // catch(e)
    // {
    //   console.log(e.message);
    // }
    
    //var ret = { error: error, jwtToken: refreshedToken };
    //res.status(200).json(ret);
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