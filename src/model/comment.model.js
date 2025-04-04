const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const comment = new Schema({
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', comment);

module.exports = Comment;