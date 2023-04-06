require('express');
require('mongodb');

const User = require("./models/user.js");
//load card model

//const Card = require("./models/card.js");
const Post = require("./models/post.js");

const Comment = require("./models/comment.js");

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







  
  app.post('/api/searchposts', async (req, res, next) => 
  {  
    var error = '';
    
    //userid was being read in here, but why?
    const { search, jwtToken } = req.body;
    // try
    // {
    //   if( token.isExpired(jwtToken))
    //   {
    //     var r = {error:'The JWT is no longer valid', jwtToken: ''};
    //     res.status(200).json(r);
    //     return;
    //   }
    // }
    // catch(e)
    // {
    //   console.log(e.message);
    // }
    
    var _search = search.trim();
    
    //const db = client.db();
    //const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
    let results = await Post.find({ "crittername": { $regex: _search + '.*', $options: 'r' } });
    
    var _ret = [];
    if(results.length == 0){
      results = await Post.find({ "": { $regex: _search + '.*', $options: 'r' } });
    }

    for( var i=0; i<results.length; i++ )
    {
      _ret.push( results[i] );
    }
    
    var ret = { _ret };
    res.status(200).json(ret);

    // var refreshedToken = null;
    // try
    // {
    //   refreshedToken = token.refresh(jwtToken);
    // }
    // catch(e)
    // {
    //   console.log(e.message);
    // }
  
    // var ret = { results:_ret, error: error, jwtToken: refreshedToken };
    
    // res.status(200).json(ret);
  });











app.post('/api/updatepost', async (req, res, next) => 
{  
  var error = '';
  
  const { postsId, newLikes, newComments } = req.body;
  const filter = { _id: postsId };
  const update = { likes: newLikes, comments: newComments }
  const opts = { new: true };

  //Searches for a post with the specfic post id, and then updates the likes and comments to the new likes and comments.
  const ret = await Post.findOneAndUpdate(filter, update, opts);

  res.status(200).json(ret);
});





app.post('/api/addcomment', async (req, res, next) =>
{

  const { author, parentpost, content, likes } = req.body;

  const newComment = new Comment({  author: author, parentpost: parentpost, content: content, likes: likes });
  var error = '';
  try 
  {
    newComment.save();
    //Temporary retruning code for the newpost
    var ret = { newComment };
    res.status(200).json(ret);
  }
    catch (e) 
  {
    error = e.toString();
  }
});


app.delete('/api/deletecomment', async (req, res, next) => 
  {
    const { commentsId } = req.body;
    try 
    {
      const deletedComment = await Comment.findByIdAndDelete(commentsId);

      if (!deletedComment) 
      {
        return res.status(400).json({ message: "no comment found" });
      }
      res.status(200).json({ message: "Comment deleted." });
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

  app.post('/api/getcomment', async (req, res, next) => 
  {  
    
    const { commentsId, jwtToken } = req.body;
    

    let result = await Comment.findById( commentsId );
    if(result == null){
      return res.status(400).json({ message: "No comment found" });
    }
    
    res.status(200).json(result);
  });

  
  app.post('/api/getpost', async (req, res, next) => 
  {  
    
    const { postsId, jwtToken } = req.body;
    

    let result = await Post.findById( postsId );
    if(result == null){
      return res.status(400).json({ message: "No post found" });
    }
    
    res.status(200).json(result);
  });















}