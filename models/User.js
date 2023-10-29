const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, required: true, minLenght: 3, maxLength: 20},
    password: {type: String, required: true}
});

module.exports = mongoose.model("User", userSchema);