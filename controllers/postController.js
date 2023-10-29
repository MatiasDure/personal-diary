const postCollection = require("../models/Post");
const asyncHandler = require("express-async-handler");

exports.my_post_list = asyncHandler(async (req, res, next) => {
    if(!req.user) return res.render("my_post_list");

    const myPosts = await postCollection.find({owner: req.user._id}).exec();

    res.render("my_post_list", {
        post_list: myPosts
    });
});

exports.public_post_list = asyncHandler(async (req, res, next) => {
    const allPublicPosts = await postCollection.find({public:true}).populate({path:"owner", select:"username -_id"}).exec();

    res.render("public_post_list", {
        post_list: allPublicPosts
    });
});

exports.post_create_get = (req, res, next) => {
    res.render("post_form", {
        post: undefined
    });
};

exports.post_create_post = asyncHandler(async (req, res, next) => {

    const createdPost = new postCollection({
        owner: req.user._id,
        content: req.body.content,
        public: req.body.isPublic === "true"
    });

    await createdPost.save();

    res.redirect("/my_post_list");
});

exports.post_update_get = asyncHandler(async (req, res, next) => {
    const post = await postCollection.findById(req.params.id);

    res.render("post_form",{
        post: post
    });
});

exports.post_update_post = asyncHandler(async(req, res, next) => {

    const updatedPost = new postCollection({
        owner: req.user._id,
        content: req.body.content,
        public: req.body.isPublic === "true",
        _id: req.params.id,
    });

    await postCollection.findByIdAndUpdate(req.params.id, updatedPost);

    res.redirect("/my_posts");
});

exports.post_delete_get = asyncHandler(async (req, res, next) => {
    await postCollection.findByIdAndDelete(req.params.id);

    res.redirect("/my_posts");
});