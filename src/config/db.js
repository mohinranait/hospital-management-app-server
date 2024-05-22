const mongoose = require("mongoose");
const { DatabaseURL } = require("./secretEnv");

const connectDb = async () => {
    try {
        await mongoose.connect(DatabaseURL);
        console.log("Connect DB");
    } catch (error) {
        console.log(error.message);
    }
} 

module.exports = connectDb