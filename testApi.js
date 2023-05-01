/*file for isolating and testing using Jest and mock 
without having to deal with GridFS or router errors*/


const express = require('express');
const bodyParser = require('body-parser');
const Critter = require('./models/critter');
const Post = require('./models/post');
const app = express();
app.use(bodyParser.json());

app.post('/api/searchcritters', async (req, res, next) => {  
  var error = '';
  const { search, jwtToken } = req.body;
  var _search = search.trim();
  
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

app.delete('/api/deletepost', async (req, res, next) => 
  {
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
  });

  app.post('/api/searchposts', async (req, res, next) => 
  {  
    var error = '';

    const { search, jwtToken } = req.body;
    
    var _search = search.trim();
    let results = await Post.find({ "crittername": { $regex: _search + '.*', $options: 'i'} });
    
    var _ret = [];
    if(results.length == 0){
      results = await Post.find({ "": { $regex: _search + '.*',$options: 'i'} });
    }

    for( var i=0; i<results.length; i++ )
    {
      _ret.push( results[i] );
    }
    
    var ret = { _ret };
    res.status(200).json(ret);
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
module.exports = app;
