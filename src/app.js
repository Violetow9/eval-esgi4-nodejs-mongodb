const express = require("express");
const app = express();

const {connect} = require('./database/connection.js');

const database = async () => {
    await connect();
}
database();

app.use(express.json());

const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");

//common headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST");

    next();
});

app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/posts/comment', commentRoute);

module.exports = app;