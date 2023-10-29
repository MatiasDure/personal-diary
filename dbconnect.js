const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

exports.main = async function main()
{
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");
};