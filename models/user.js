const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
  /* Rick L's schema
  UserId: {
    type: Number
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Login: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
  */
 username: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 },
 favorite: {
  type: String,
  required: true
 }

});
module.exports = user = mongoose.model("Users", UserSchema);