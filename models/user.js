const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({
  /* Rick L's schema
  : {
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
  username: String,
  password: String,
  /*
  favorite: {
   type: String,
   required: true
  }
 */
});
module.exports = User = mongoose.model("Users", UserSchema, "Users");