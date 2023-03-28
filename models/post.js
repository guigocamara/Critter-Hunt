const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const PostShema = new Schema({
  userid: {
    type: Number
  },
  critter: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },

});
module.exports = Card = mongoose.model('Cards', CardSchema);