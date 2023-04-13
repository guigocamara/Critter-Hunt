const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const CritterSchema = new Schema({
    crittername:  {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    foodcount: {
        type: Number,
        required: true,
    }
});
module.exports = Comment = mongoose.model('Critters', CritterSchema , 'Critters');