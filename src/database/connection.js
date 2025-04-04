const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database");
    } catch (error) {
        console.error("Error database connection" + error);
    }
}

module.exports = { connect };
