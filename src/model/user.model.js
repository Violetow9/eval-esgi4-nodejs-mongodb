const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const user = new Schema({
    pseudo: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: function(value){
            return /.+@.+/.test(value);
        }
    },
    password: String
});

const User = mongoose.model('User', user);

module.exports = User;