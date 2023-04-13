const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const PostSchema = new Schema({
  likes: {
    type: Number,
    required: true
  },
  crittername:  {
    type: String,
    required: true,
  },
  author:  {
    type: ObjectId,
    required: true,
  },
  comments:  {
    type: [ObjectId],
    required: true,
  },
  picture:  {
    type: String,
    required: true,
  },
  location: {
    type: [String],
    required: true,
  }
});
module.exports = Post = mongoose.model('Posts', PostSchema, 'Posts');