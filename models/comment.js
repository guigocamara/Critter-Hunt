const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const CommentSchema = new Schema({
    author:  {
        type: ObjectId,
        required: true,
    },
    parentpost: {
        type: ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type : Number,
        required: true,
    }
});
module.exports = Comment = mongoose.model('Comments', CommentSchema , 'Comments');