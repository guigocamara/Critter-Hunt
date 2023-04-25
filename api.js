require('express');
require('mongodb');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

// load user model
const User = require("./models/user.js");

// load card model
//const Card = require("./models/card.js");

// load post model
const Post = require("./models/post.js");

const Comment = require("./models/comment.js");

const Critter = require("./models/critter.js");

// load image model
const Image = require("./models/image.js");

const url = process.env.MONGODB_URI;

// Set up the GridFS stream
const conn = mongoose.createConnection(url, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create a GridFS storage engine
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads',
        metadata: { uploader: req.body.uploader }
      };
      resolve(fileInfo);
    });
  },
});



exports.setApp = function (app, client) {
  /*COMMENTS
    For now we are leaving out some of the calls to the jwtTokens in the api calls. This needs to be reimplemented once combined witht the frontend!
  */

  // Create a Multer instance using the GridFS storage engine for file uploads
  const upload = multer({ storage });

  // Upload endpoint
  app.post('/upload', upload.single('file'), (req, res) => {
    const {filename} = req.file;
    const newImage = new Image({filename});

    try
    {
      // await newImage.save();
      const imageId = newImage._id; //added to retriev userId
      // ret.imageId = imageId; //added to retriev userId
      res.status(200).json(imageId);
    }
    catch (e)
    {
      //ret = { error: e.message };
      res.status(400).json(e.message);
    } 
    // res.status(200).json({ ret, message: 'File uploaded successfully' });
  });

  // Fetch image endpoint
  app.get('/image/:name', async (req, res) => {
    const imageName = req.params.name;
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads'
    });

    try {
      const file = await bucket.find({ filename: imageName }).toArray();
      if (!file || !file.length) {
        res.status(400).send('Image not found');
        return;
      }

      const downloadStream = bucket.openDownloadStreamByName(imageName);
      downloadStream.pipe(res);
      console.log(`Image with id ${file[0]._id.toString()} fetched successfully`);
      //res.status(200).json(file[0]._id.toString());
    } catch (err) {
      console.log(err);
      res.status(500).send('An error occurred while fetching the image');
    }
  });

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
      const newUser = new User({username: username, password: password, email: email, createdAt: new Date().toLocaleDateString()});
      try
      {    
        await newUser.save();
        const userId = newUser._id; //added to retriev userId
        const dateJoined = newUser.createdAt; //added to show date joined
        const token = require('./createJWT.js');
        const ret = token.createToken(username, password, email);
        ret.userId = userId; //added to retriev userId
        ret.dateJoined = dateJoined; //added to show date joined
        res.status(200).json(ret);
      }
      catch (e)
      {
        ret = { error: e.message };
      }
    }
  });


  /*
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
        return res.status(400).json({message: 'Username already taken. Please try another one.'});
    }

    if(existingEmail)
    {
        return res.status(400).json({message: 'Email already taken. Please try another one.'});
    }

  //  const token = crypto.randomBytes(20).toString('hex');
    const verificationLink = `http://localhost5000/api/verifyEmail/${token}`;

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
        subject: 'Email Verification Link',
        html: `Please click <a href="${verificationLink}">here</a> to verify your email address.`
    };

    try 
    {
        await transporter.sendMail(mailOptions);

        const newUser = new User({username: username, password: password, email: email, createdAt: new Date().toLocaleDateString(), verificationToken: token});

        await newUser.save();
        const userId = newUser._id; //added to retrieve userId
        const dateJoined = newUser.createdAt; //added to show date joined
        const token = require('./createJWT.js');
        const ret = token.createToken(username, password, email);
        ret.userId = userId; //added to retrieve userId
        ret.dateJoined = dateJoined; //added to show date joined
        res.status(200).json(ret);
    } 
    catch (e) 
    {
        ret = { error: e.message };
    }
});

app.get('/api/verifyEmail/:token', async (req, res, next) => 
{
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) 
    {
        return res.status(400).json({ message: 'Invalid verification link' });
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
});


  */















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

  // Retrieve the number of posts for each user
app.get('/api/users/rank', async (req, res) => 
{
  try 
  {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'Posts',
          localField: '_id',
          foreignField: 'author',
          as: 'Posts'
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          numPosts: { $size: '$Posts' }
        }
      },
      {
        $sort: { numPosts: -1 }
      }
    ]);
    res.status(200).json(users);
  } 
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
});


app.get('/api/datejoined/:id', async (req, res) => 
{
  const infoId = req.params.id;

  try 
  {
    const info = await User.findById(infoId);
    if (!info) 
    {
      return res.status(400).json({ message: 'Information not found' });
    }

    const dateJoined = info.createdAt; 

    res.status(200).json({ dateJoined });
  } 
  catch (error) 
  {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/getUsername/:id', async (req, res) => 
{
  const id = req.params.id;
  try 
  {
    const user = await User.findOne({ _id: id });
    if (!user) 
    {
      return res.status(400).json({ message: 'User not found with that ID' });
    }
    res.json({ username: user.username });
  } 
  catch (err) 
  {
    console.error(err);
    res.status(400).json({ message: 'Internal server error' });
  }
});
  
  

}