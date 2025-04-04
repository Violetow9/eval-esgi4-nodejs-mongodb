const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const post = new Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Post = mongoose.model('Post', post);

module.exports = Post;