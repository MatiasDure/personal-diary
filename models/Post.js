const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref:"User", required: true},
    content: { type: String, required: true, minLength: 1, maxLength: 100},
    public: { type: Boolean, default: true }
});

module.exports = mongoose.model("Post", postSchema);