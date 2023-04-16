require('express');
require('mongodb');

const User = require("./models/user.js");
//load card model

//const Card = require("./models/card.js");
const Post = require("./models/post.js");

const Comment = require("./models/comment.js");

const Critter = require("./models/critter.js");

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
      const userId = results[0]._id; //added to retriev userId
      try {
        const token = require("./createJWT.js");
        ret = token.createToken(us, pa, fa);
        ret.userId = userId;//added to retriev userId
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

    const { username, password, email } = req.body;

    if(!username || !password || !email)
    {
      return res.status(400).json({message: 'Please fill all the required fields'});
    }

    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if(existingUser)
    {
      return res.status(400).json({message: 'usernmane already taken. Please try another one.'});
    }

    if (existingEmail)
    {
      return res.status(400).json({message: 'email already taken. Please try another one.'});
    }

    else
    {
      const newUser = new User({username: username, password: password, email: email});
      try
      {    
        await newUser.save();
        const userId = newUser._id; //added to retriev userId
        const token = require('./createJWT.js');
        const ret = token.createToken(username, password, email);
        ret.userId = userId; //added to retriev userId
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
    const { crittername, author, likes, comments, location, picture, jwtToken } = req.body;
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

    const newPost = new Post({  crittername: crittername, author: author, likes: likes, comments: comments, location: location, picture: picture });
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

    const { PostsId } = req.body;
    try 
    {
      const deletedPost = await Post.findByIdAndDelete(PostsId);

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
    let results = await Post.find({ "crittername": { $regex: _search + '.*'} });
    
    var _ret = [];
    if(results.length == 0){
      results = await Post.find({ "": { $regex: _search + '.*'} });
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


  app.post('/api/addcritter', async (req, res, next) =>
  {

    const { crittername, category, likes, foodcount } = req.body;

    const newCritter = new Critter({  crittername: crittername, category: category, likes: likes, foodcount: foodcount });
    var error = '';
    try 
    {
      newCritter.save();
      //Temporary retruning code for the newpost
      var ret = { newCritter };
      res.status(200).json(ret);
    }
      catch (e) 
    {
      error = e.toString();
    }
  });

  app.post('/api/searchcritters', async (req, res, next) => 
  {  
    var error = '';
    
    //userid was being read in here, but why?
    const { search, jwtToken } = req.body;
    
    var _search = search.trim();
    
    //const db = client.db();
    //const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
    let results = await Critter.find({ "crittername": { $regex: _search + '.*', $options: 'r' } });
    
    var _ret = [];
    if(results.length == 0){
      results = await Critter.find({ "": { $regex: _search + '.*', $options: 'r' } });
    }

    for( var i=0; i<results.length; i++ )
    {
      _ret.push( results[i] );
    }
    
    var ret = { _ret };
    res.status(200).json(ret);

  });
















  app.post('/api/forgotpassword', async (req, res) => 
  {
    const { email } = req.body;
  
    // find user by email
    const user = await User.findOne({ email: email });

    if (!user) 
    {
      return res.status(404).json({ error: 'User not found' });
    }
  
    //generate token function
    const crypto = require('crypto');

    // Generate a random token with the specified length
    function generateResetToken(length = 20) 
    {
      return crypto.randomBytes(length).toString('hex');
    }


    // generate reset token
    const resetToken = generateResetToken();

    // save reset token to user document
    user.resetToken = resetToken;
    await user.save();

  
    const nodemailer = require('nodemailer');

    function sendResetEmail(email, resetLink) 
    {
      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: 
        {
          user: 'critterhunt@zohomail.com',
          pass: 'Critterhunt1234!'
        }
      });

      const mailOptions = 
      {
        from: 'critterhunt@zohomail.com',
        to: email,
        subject: 'Password reset request',
        text: `Please use the following reset token to reset your password: ${resetToken} `,
        html: `<p>Please use the following reset token to reset your password: ${resetToken} </p>`
      };

      transporter.sendMail(mailOptions, (error, info) => 
      {
        if (error) 
        {
          console.log(error);
        } 
        else 
        {
          console.log(`Email sent: ${info.response}`);
        }
      });
    }



    // send email with reset link
    const resetLink = `http://localhost:3000/api/resetpassword?token=${resetToken}`;
    sendResetEmail(email, resetLink);
  
    res.json({ message: 'Password reset email sent' });
  });

  app.post('/api/resetpassword', async (req, res) => 
  {
    const { token, password } = req.body;
  
    // find user by reset token
    const user = await User.findOne({ resetToken: token });
  
    // check if token is expired
    // if (Date.now() > user.resetTokenExpiration) {
    //   return res.status(400).json({ message: 'Reset token expired' });
    // }
  
    // update user with new password and clear reset token
    await user.updateOne({ password, token: null, resetTokenExpiration: null });
  
    res.json({ message: 'Password reset successfully' });
  });
  
  

}