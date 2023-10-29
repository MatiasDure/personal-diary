const userCollection = require("../models/User");
const postCollection = require("../models/Post");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const [numUsers, numPublicPosts] = await Promise.all([
        userCollection.countDocuments().exec(),
        postCollection.countDocuments({public:true}).exec()
    ]);

    res.render("index", {
        user_count: numUsers,
        public_post_count: numPublicPosts
    });
});