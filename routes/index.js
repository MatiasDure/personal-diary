const express = require('express');
const passport = require("../auth");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

/* GET home page. */
router.get('/', userController.index);

router.post("/", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
})
);

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
})

router.post("/sign-up", async (req, res, next) => {
  try
  {
    bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
      
      if(err) return next(err);

      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
      });

      await newUser.save();
      res.redirect("/");
    });
  }
  catch(error)
  {
    return next(error);
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if(error) return next(error);

    res.redirect("/");
  })
});

//posts
router.get("/create_post", postController.post_create_get);
router.post("/create_post", postController.post_create_post);
router.get("/my_posts", postController.my_post_list);
router.get("/public_posts", postController.public_post_list);
router.get("/post/delete/:id", postController.post_delete_get);
router.get("/post/update/:id", postController.post_update_get);
router.post("/post/update/:id", postController.post_update_post);

module.exports = router;
