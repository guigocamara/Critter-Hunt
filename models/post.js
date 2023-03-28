const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const PostShema = new Schema({
  likes: {
    type: Number,
    required: true
  },
  critterid:  {
    type: String,
    required: true,
  },
  crittername:  {
    type: String,
    required: true,
  },
  author:  {
    type: String,
    required: true,
  },
  comments:  {
    type: Array,
    required: true,
  },
  comments:  {
    type: Array,
    required: true,
  },
  picture:  {
    type: String,
    required: true,
  },
});
module.exports = Post = mongoose.model('Posts', CardSchema);